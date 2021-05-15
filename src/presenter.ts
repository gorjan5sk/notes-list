import { computed, makeObservable } from "mobx";
import { NoteSelection, NotesList, NoteType } from "./domain";
import { UUID } from "./util";

export interface NoteItemView {
  id: UUID;
  type: NoteType;
  title: string;
  selected: boolean;
  private: boolean;
  tags: string[];
  date: string;
  body: string | null;
}

function determineBody(ns: NoteSelection): string | null {
  switch (ns.type) {
    case "rich-text":
      return ns.document.slice(0, 90);
    case "plain-text":
      return ns.text.slice(0, 90);
    case "code":
      return ns.code.slice(0, 90);
    case "spreadsheet":
      return null;
    case "token-vault":
      return null;
  }
}

const prettyPrintDate = (d: Date) => d.toLocaleString();

const convertToView = (ns: NoteSelection[]): NoteItemView[] =>
  ns.map((ns) => ({
    id: ns.id,
    type: ns.type,
    title: ns.title.slice(0, 90),
    selected: ns.selected,
    private: ns.private,
    tags: ns.tagLabels,
    date: prettyPrintDate(ns.edited),
    body: determineBody(ns),
  }));

export class Presenter {
  private readonly notes: NotesList;

  constructor(notes: NotesList) {
    makeObservable(this, {
      listNotes: computed,
      orderedBy: computed,
      canAddNote: computed,
    });
    this.notes = notes;
  }

  get listNotes() {
    return convertToView(this.notes.listNotes);
  }

  get orderedBy() {
    return this.notes.orderBy;
  }

  get canAddNote() {
    return this.notes.predefinedDataAvailable;
  }

  get numSelected() {
    return this.notes.numSelected;
  }
}
