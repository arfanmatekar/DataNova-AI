import assert from "node:assert/strict";
import test from "node:test";
import { analyzeUploadedFile } from "./file-analysis.ts";

test("analyzes CSV files and infers records and columns", async () => {
  const file = new File([
    "name,age,city\n",
    "Aisha,28,Mumbai\n",
    "Rahul,31,Delhi\n",
  ], "people.csv", { type: "text/csv" });

  const analysis = await analyzeUploadedFile(file);

  assert.equal(analysis.type, "csv");
  assert.equal(analysis.recordCount, 2);
  assert.deepEqual(analysis.columns, ["name", "age", "city"]);
  assert.equal(analysis.preview.length, 2);
});

test("rejects files larger than 5 MB", async () => {
  const file = new File([new Uint8Array(5 * 1024 * 1024 + 1)], "large.csv", { type: "text/csv" });

  await assert.rejects(() => analyzeUploadedFile(file), /5 MB/);
});
