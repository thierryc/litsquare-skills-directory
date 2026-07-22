import { readFile } from "node:fs/promises";
import Ajv2020, { type ValidateFunction } from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const schemaFiles = [
  "schemas/catalog-v1.schema.json",
  "schemas/skillkit-v1.schema.json",
  "schemas/skillkit-lock-v1.schema.json"
];

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

for (const filename of schemaFiles) {
  const schema = JSON.parse(await readFile(filename, "utf8"));
  ajv.addSchema(schema);
}

const manifest = JSON.parse(
  await readFile("fixtures/skillkit-v1/skills.json", "utf8")
);
const lock = JSON.parse(
  await readFile("fixtures/skillkit-v1/skills.lock", "utf8")
);

const manifestValidator = requiredValidator(
  "https://skills.litsquare.com/schemas/skillkit/v1/schema.json"
);
const lockValidator = requiredValidator(
  "https://skills.litsquare.com/schemas/skillkit/v1/lock.schema.json"
);

assertValid("fixtures/skillkit-v1/skills.json", manifestValidator, manifest);
assertValid("fixtures/skillkit-v1/skills.lock", lockValidator, lock);

assertInvalid(
  "non-empty M2 dependencies",
  manifestValidator,
  { ...manifest, dependencies: { remote: "1.0.0" } }
);
assertInvalid(
  "a lock entry without content_digest",
  lockValidator,
  {
    ...lock,
    resolved: {
      ...lock.resolved,
      "./skills/design-critique": { source: "bundle:design-critique" }
    }
  }
);

console.log(`Compiled ${schemaFiles.length} schemas and validated SkillKit v1 fixtures.`);

function requiredValidator(id: string): ValidateFunction {
  const validator = ajv.getSchema(id);
  if (!validator) throw new Error(`Schema did not register: ${id}`);
  return validator;
}

function assertValid(label: string, validator: ValidateFunction, value: unknown): void {
  if (!validator(value)) {
    throw new Error(`${label}: ${ajv.errorsText(validator.errors, { separator: "\n  " })}`);
  }
}

function assertInvalid(label: string, validator: ValidateFunction, value: unknown): void {
  if (validator(value)) throw new Error(`Schema unexpectedly accepted ${label}.`);
}
