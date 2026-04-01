import * as fs from "fs";
import * as readline from "readline";

type OrderItem = {
  brand: string;
};

type ComboCounter = Map<string, number>;

const filePath =
  "C:/Users/User/store-api-v1/scripts/orders/order-products.jsonl";

function combinations<T>(arr: T[], k: number): T[][] {
  const result: T[][] = [];

  function helper(start: number, combo: T[]) {
    if (combo.length === k) {
      result.push([...combo]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      combo.push(arr[i]);
      helper(i + 1, combo);
      combo.pop();
    }
  }

  helper(0, []);
  return result;
}

function increment(map: ComboCounter, key: string) {
  map.set(key, (map.get(key) || 0) + 1);
}

function printTop(title: string, map: ComboCounter, limit = 20) {
  console.log("\n" + title);
  console.log("=".repeat(title.length));

  const sorted = [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);

  for (const [combo, count] of sorted) {
    console.log(`${combo} → ${count}`);
  }
}

async function analyze() {
  const pairCounts: ComboCounter = new Map();
  const tripleCounts: ComboCounter = new Map();
  const quadCounts: ComboCounter = new Map();

  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (!line.trim()) continue;

    // NOTE: Even though each item has an `order_id`, this script doesn't need to
    // read it explicitly because the input file is JSONL where *each line is one
    // order*: the line is a JSON array of all order-product rows for a single
    // order_id (see example data). We compute unique brands within that line
    // (order) and increment each pair/triple/quad ONCE per order.
    const items: OrderItem[] = JSON.parse(line);

    const brands = Array.from(
      new Set(
        items.map((i) => i.brand?.trim()).filter((b) => b && b.length > 0),
      ),
    ).sort();

    if (brands.length < 2) continue;

    combinations(brands, 2).forEach((combo) =>
      increment(pairCounts, combo.join(" || ")),
    );

    if (brands.length >= 3) {
      combinations(brands, 3).forEach((combo) =>
        increment(tripleCounts, combo.join(" || ")),
      );
    }

    if (brands.length >= 4) {
      combinations(brands, 4).forEach((combo) =>
        increment(quadCounts, combo.join(" || ")),
      );
    }
  }

  printTop("Top Brand Pairs", pairCounts);
  printTop("Top Brand Triplets", tripleCounts);
  printTop("Top Brand Quadruplets", quadCounts);
}

analyze();
