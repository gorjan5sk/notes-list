import {
  CodeData,
  CommonNoteData,
  noteTypes,
  PlainTextData,
  RichTextData,
  SpreadsheetData,
  TokenVaultData,
  NewNoteData,
  TaggedNoteData,
} from "../src/domain";

import * as fc from "fast-check";
import * as fs from "fs";
import * as yargs from "yargs";

const tag = fc.constantFrom(
  "Food",
  "Science",
  "Saturnalia",
  "Movies",
  "Music",
  "Art"
);

const bodyText = fc.lorem({ mode: "sentences", maxCount: 30 });

const tags: fc.Arbitrary<TaggedNoteData> = fc.record({
  tagLabels: fc.array(tag),
});

const commonNoteData: fc.Arbitrary<CommonNoteData> = fc.record({
  title: fc.lorem({ maxCount: 10, mode: "sentences" }),
  type: fc.constantFrom(...noteTypes),
  private: fc.boolean(),
});

const richTextData: fc.Arbitrary<RichTextData> = fc.record({
  type: fc.constant("rich-text"),
  document: bodyText,
});

const codeData: fc.Arbitrary<CodeData> = fc.record({
  type: fc.constant("code"),
  code: fc.asciiString({ minLength: 100, maxLength: 200 }),
});

const plainTextData: fc.Arbitrary<PlainTextData> = fc.record({
  type: fc.constant("plain-text"),
  text: bodyText,
});

const dim = { maxLength: 5, minLength: 5 };
const spreadsheetData: fc.Arbitrary<SpreadsheetData> = fc.record({
  type: fc.constant("spreadsheet"),
  sheet: fc.array(fc.array(fc.integer(), dim), dim),
});

const tokenVaultData: fc.Arbitrary<TokenVaultData> = fc.record({
  type: fc.constant("token-vault"),
  secretData: fc.base64String(),
});

const newNoteArb: fc.Arbitrary<NewNoteData> = fc
  .record({
    tagData: tags,
    commonData: commonNoteData,
    otherData: fc.oneof(
      richTextData,
      plainTextData,
      codeData,
      spreadsheetData,
      tokenVaultData
    ),
  })
  .map((d) => ({ ...d.tagData, ...d.commonData, ...d.otherData }));

const generateNotes = (n: number) => fc.sample(newNoteArb, n);

function saveToFile(n: NewNoteData[], filename: string) {
  fs.writeFileSync(filename, JSON.stringify(n, null, 2));
}

export function seedNotes(filename: string, n: number) {
  const notes = generateNotes(n);
  saveToFile(notes, filename);
}

const opts = yargs
  .usage("Usage: -n <num_samples> -f <filename>")
  .option("num", {
    alias: "n",
    describe: "Number of samples",
    type: "number",
    demandOption: true,
  })
  .option("file", {
    alias: "f",
    describe: "Filename with path",
    type: "string",
    demandOption: true,
  }).argv;

seedNotes(opts.file, opts.num);
