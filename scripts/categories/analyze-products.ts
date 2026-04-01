import * as fs from "fs";
import * as readline from "readline";

type OrderItem = {
  sku: string;
  name: string;
  discounted_total_inc_tax: string;
};

type ComboCounter = Map<string, number>;

const filePath =
  "C:/Users/User/store-api-v1/scripts/orders/order-products.jsonl";

// Generate combinations of size k
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

    const items: OrderItem[] = JSON.parse(line);

    // Build unique product identity: "SKU | Name"
    const products = Array.from(
      new Set(
        items
          .filter(
            (i) => i.sku && i.name && Number(i.discounted_total_inc_tax) > 0,
          )
          .map((i) => `${i.sku} | ${i.name}`),
      ),
    ).sort();

    if (products.length < 2) continue;

    combinations(products, 2).forEach((combo) =>
      increment(pairCounts, combo.join(" || ")),
    );

    if (products.length >= 3) {
      combinations(products, 3).forEach((combo) =>
        increment(tripleCounts, combo.join(" || ")),
      );
    }

    if (products.length >= 4) {
      combinations(products, 4).forEach((combo) =>
        increment(quadCounts, combo.join(" || ")),
      );
    }
  }

  printTop("Top Product Pairs", pairCounts, 40);
  printTop("Top Product Triplets", tripleCounts);
  printTop("Top Product Quadruplets", quadCounts);
}

analyze();
