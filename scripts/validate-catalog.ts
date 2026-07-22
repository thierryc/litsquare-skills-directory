import { readFile } from "node:fs/promises";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { catalogFiles, expectedKind, readJSON, type CatalogRecord } from "./catalog-lib.ts";

const schema = JSON.parse(await readFile("schemas/catalog-v1.schema.json", "utf8"));
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);
const seen = new Map<string, string>();
let failures = 0;

for (const file of await catalogFiles()) {
  let record: CatalogRecord;
  try {
    record = (await readJSON(file)) as CatalogRecord;
  } catch (error) {
    console.error(`${file}: invalid JSON: ${String(error)}`);
    failures += 1;
    continue;
  }

  if (!validate(record)) {
    console.error(`${file}: ${ajv.errorsText(validate.errors, { separator: "\n  " })}`);
    failures += 1;
    continue;
  }

  const kind = expectedKind(file);
  if (record.kind !== kind) {
    console.error(`${file}: kind ${record.kind} does not match ${kind} directory`);
    failures += 1;
  }

  const prior = seen.get(record.id);
  if (prior) {
    console.error(`${file}: duplicate id ${record.id}; first declared in ${prior}`);
    failures += 1;
  } else {
    seen.set(record.id, file);
  }

  if (path.basename(file, ".json") !== record.id) {
    console.error(`${file}: filename must equal id (${record.id}.json)`);
    failures += 1;
  }
}

if (failures > 0) process.exit(1);
console.log(`Validated ${seen.size} catalog record${seen.size === 1 ? "" : "s"}.`);
