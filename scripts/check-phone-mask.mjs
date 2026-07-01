import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";

const sourcePath = join(process.cwd(), "src/lib/phoneMask.ts");
const source = readFileSync(sourcePath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2020,
    strict: true,
  },
});

const tempDir = mkdtempSync(join(tmpdir(), "phone-mask-"));
const compiledPath = join(tempDir, "phoneMask.mjs");
writeFileSync(compiledPath, compiled.outputText);

const {
  formatRussianPhoneInput,
  getRussianPhoneDigits,
  isCompleteRussianPhone,
} = await import(compiledPath);

const expectations = [
  ["", "+7 "],
  ["8", "+7 "],
  ["89991234567", "+7 (999) 123-45-67"],
  ["+7 999 123 45 67", "+7 (999) 123-45-67"],
  ["9991234567", "+7 (999) 123-45-67"],
  ["+7 (999) 123-45-67 доб. 42", "+7 (999) 123-45-67"],
];

for (const [input, expected] of expectations) {
  const actual = formatRussianPhoneInput(input);
  if (actual !== expected) {
    throw new Error(`Expected ${JSON.stringify(input)} to format as ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

if (getRussianPhoneDigits("+7 (999) 123-45-67") !== "79991234567") {
  throw new Error("getRussianPhoneDigits should normalize a Russian phone to 11 digits");
}

if (!isCompleteRussianPhone("+7 (999) 123-45-67")) {
  throw new Error("isCompleteRussianPhone should accept a complete +7 phone");
}

if (isCompleteRussianPhone("+7 (999) 123")) {
  throw new Error("isCompleteRussianPhone should reject an incomplete +7 phone");
}

console.log("Phone mask check passed.");
