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

function saveToFile(n: Note[]) {
  fs.writeFileSync("input-data.json", JSON.stringify(n, null, 2));
}

export function seedNotes(n: number) {
  const notes = generateNotes(n);
  saveToFile(notes);
}

const options = yargs.usage("Usage: -n <number_of_samples>").option("n", {
  alias: "num",
  describe: "Number of samples",
  type: "number",
  demandOption: true,
}).argv;

seedNotes(options.n);
