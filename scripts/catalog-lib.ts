import { readFile } from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";

export const catalogPattern = "catalog/{publishers,skills,kits}/*.json";

export async function catalogFiles(): Promise<string[]> {
  return (await fg(catalogPattern, { onlyFiles: true })).sort();
}

export async function readJSON(file: string): Promise<unknown> {
  return JSON.parse(await readFile(file, "utf8"));
}

export function expectedKind(file: string): "publisher" | "skill" | "kit" {
  const directory = path.basename(path.dirname(file));
  if (directory === "publishers") return "publisher";
  if (directory === "skills") return "skill";
  if (directory === "kits") return "kit";
  throw new Error(`Unsupported catalog directory for ${file}`);
}

export type CatalogRecord = {
  id: string;
  kind: "publisher" | "skill" | "kit";
  name: string;
  description: string;
  publisher: { name: string; domain: string };
  source: string;
  license: string;
  digest: string;
  [key: string]: unknown;
};
