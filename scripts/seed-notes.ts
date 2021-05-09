import { Note } from "../src/model";
import * as fc from "fast-check";
import * as fs from "fs";
import * as yargs from "yargs";

const oneWord = fc.lorem({ maxCount: 1 });

const daysLater = (orig: Date, days: number): Date =>
  new Date(orig.getTime() + days * 24 * 60 * 60 * 1000);

const noteArb: fc.Arbitrary<Note> = fc
  .record({
    title: fc.lorem({ maxCount: 30 }),
    body: fc.lorem(),
    icon: oneWord,
    created: fc.date({}),
    editedDaysLater: fc.nat({}),
    locked: fc.boolean(),
    tags: fc.array(oneWord),
  })
  .map((n) => ({ ...n, edited: daysLater(n.created, n.editedDaysLater) }));

const generateNotes = (n: number) => fc.sample(noteArb, n);

function saveToFile(n: Note[], filename: string) {
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
