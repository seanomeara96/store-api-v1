import * as fs from "fs";
import * as readline from "readline";

type OrderItem = {
  sku: string;
  name: string;
  discounted_total_inc_tax: string;
};

type ComboCounter = Map<string, number>;

const store = "bsk";
const filePath = `C:/Users/User/store-api-v1/scripts/orders/${store}-order-products.jsonl`;

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

function csvEscape(value: string) {
  const s = String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function writeTopCsv(
  title: string,
  map: ComboCounter,
  limit: number,
  outPath: string,
) {
  const sorted = [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);

  const lines: string[] = ["title,combo,count"];
  for (const [combo, count] of sorted) {
    lines.push(
      `${csvEscape(title)},${csvEscape(combo)},${csvEscape(String(count))}`,
    );
  }

  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
}

function parseProductIdentity(identity: string): {
  sku: string;
  product: string;
} {
  const [sku, ...rest] = identity.split(" | ");
  return { sku: (sku || "").trim(), product: rest.join(" | ").trim() };
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

  const csvPath = `C:/Users/User/store-api-v1/scripts/orders/${store}-product-combos.csv`;
  const limitPairs = 40;
  const limitTriples = 20;
  const limitQuads = 20;

  const pairRows = [...pairCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limitPairs)
    .map(([comboKey, count]) => {
      const parts = comboKey.split(" || ").map(parseProductIdentity);
      return [
        "Top Product Pairs",
        parts[0]?.sku ?? "",
        parts[0]?.product ?? "",
        parts[1]?.sku ?? "",
        parts[1]?.product ?? "",
        "",
        "",
        "",
        "",
        String(count),
      ];
    });

  const tripleRows = [...tripleCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limitTriples)
    .map(([comboKey, count]) => {
      const parts = comboKey.split(" || ").map(parseProductIdentity);
      return [
        "Top Product Triplets",
        parts[0]?.sku ?? "",
        parts[0]?.product ?? "",
        parts[1]?.sku ?? "",
        parts[1]?.product ?? "",
        parts[2]?.sku ?? "",
        parts[2]?.product ?? "",
        "",
        "",
        String(count),
      ];
    });

  const quadRows = [...quadCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limitQuads)
    .map(([comboKey, count]) => {
      const parts = comboKey.split(" || ").map(parseProductIdentity);
      return [
        "Top Product Quadruplets",
        parts[0]?.sku ?? "",
        parts[0]?.product ?? "",
        parts[1]?.sku ?? "",
        parts[1]?.product ?? "",
        parts[2]?.sku ?? "",
        parts[2]?.product ?? "",
        parts[3]?.sku ?? "",
        parts[3]?.product ?? "",
        String(count),
      ];
    });

  const allLines: string[] = [
    "title,sku_1,product_1,sku_2,product_2,sku_3,product_3,sku_4,product_4,count",
  ];
  for (const row of [...pairRows, ...tripleRows, ...quadRows]) {
    allLines.push(row.map(csvEscape).join(","));
  }
  fs.writeFileSync(csvPath, allLines.join("\n"), "utf8");
}

analyze();
