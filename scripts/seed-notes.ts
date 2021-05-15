import { NewNoteData } from "../src/domain";

import * as fc from "fast-check";
import * as fs from "fs";
import * as yargs from "yargs";

import { newNoteArb } from "../tests/generator";

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
