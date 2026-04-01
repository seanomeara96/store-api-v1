import { getAllCategories } from "../../functions/categories/getAllCategories";
import { writeFileSync } from "fs";

async function exportStructureToCSV() {
  try {
    require("../../config/config").config("ih");
    const categories = await getAllCategories();

    // Build parent -> children lookup
    const childrenByParent = new Map<number, any[]>();
    for (const cat of categories as any[]) {
      const pid = cat.parent_id ?? 0;
      if (!childrenByParent.has(pid)) childrenByParent.set(pid, []);
      childrenByParent.get(pid)!.push(cat);
    }

    // Deterministic ordering
    for (const [, kids] of childrenByParent) {
      kids.sort(
        (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || a.id - b.id,
      );
    }

    // Find roots (level 1)
    const roots = (childrenByParent.get(0) || []).slice();

    // Traverse to produce rows containing a column per level: level{n}_id, level{n}_name
    type LevelCell = { id: number; name: string };
    const rows: LevelCell[][] = [];

    const walk = (node: any, path: LevelCell[]) => {
      const nextPath = path.concat([{ id: node.id, name: node.name }]);
      const kids = childrenByParent.get(node.id) || [];
      if (!kids.length) {
        rows.push(nextPath);
        return;
      }
      for (const child of kids) walk(child, nextPath);
    };

    for (const root of roots) walk(root, []);

    // Determine max depth for header columns
    const maxDepth = rows.reduce((m, r) => Math.max(m, r.length), 0);

    const headers: string[] = [];
    for (let i = 1; i <= maxDepth; i++) {
      headers.push(`level${i}_id`, `level${i}_name`);
    }

    const escapeCsv = (value: any) => {
      const s = value === null || value === undefined ? "" : String(value);
      return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };

    const lines: string[] = [];
    lines.push(headers.join(","));
    for (const row of rows) {
      const lineValues: string[] = [];
      for (let i = 0; i < maxDepth; i++) {
        const cell = row[i];
        lineValues.push(escapeCsv(cell?.id ?? ""), escapeCsv(cell?.name ?? ""));
      }
      lines.push(lineValues.join(","));
    }

    writeFileSync("categories.csv", lines.join("\n"), "utf8");
    console.log(`Exported ${rows.length} category paths to categories.csv`);
  } catch (err) {
    console.log(err);
  }
}
exportStructureToCSV();
