import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { catalogFiles, readJSON, type CatalogRecord } from "./catalog-lib.ts";

const records: CatalogRecord[] = [];
for (const file of await catalogFiles()) records.push((await readJSON(file)) as CatalogRecord);
records.sort((left, right) => left.id.localeCompare(right.id, "en"));

const output = {
  schema_version: 1,
  generated_from: "catalog",
  publishers: records.filter((record) => record.kind === "publisher"),
  skills: records.filter((record) => record.kind === "skill"),
  kits: records.filter((record) => record.kind === "kit")
};

await mkdir("site/public/catalog/v1", { recursive: true });
await mkdir("site/public/schemas", { recursive: true });
await writeFile("site/public/catalog/v1/index.json", `${JSON.stringify(output, null, 2)}\n`);

for (const filename of ["catalog-v1.schema.json", "skillkit-v1.schema.json", "skillkit-lock-v1.schema.json"]) {
  const source = await readFile(path.join("schemas", filename), "utf8");
  await writeFile(path.join("site/public/schemas", filename), source.endsWith("\n") ? source : `${source}\n`);
}

console.log(`Generated indexes for ${records.length} catalog record${records.length === 1 ? "" : "s"}.`);
