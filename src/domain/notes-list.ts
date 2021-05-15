import { action, computed, makeObservable, observable } from "mobx";
import { UUID } from "../util";
import {
  CodeData,
  CommonNoteData,
  Note,
  PlainTextData,
  RichTextData,
  SpreadsheetData,
  TokenVaultData,
} from "./note";

type NewRichTextData = RichTextData & CommonNoteData;
type NewPlainTextData = PlainTextData & CommonNoteData;
type NewCodeData = CodeData & CommonNoteData;
type NewSpreadsheetData = SpreadsheetData & CommonNoteData;
type NewTokenVaultData = TokenVaultData & CommonNoteData;

export interface TaggedNoteData {
  tagLabels: string[];
}

export type NewNoteData = (
  | NewRichTextData
  | NewPlainTextData
  | NewCodeData
  | NewSpreadsheetData
  | NewTokenVaultData
) &
  TaggedNoteData;

export interface NewNoteProvider {
  isAvailable: boolean;
  getNewNote(): NewNoteData;
}

export interface NotesRepository {
  addNote(note: NewNoteData): Note;
  listNotesBy(order: OrderBy): NoteWithTags[];
}

export type OrderBy = "ascending" | "descending";

export type NoteWithTags = Note & { tagLabels: string[] };
export type NoteSelection = NoteWithTags & {
  selected: boolean;
  tagLabels: string[];
};

/**
 * Had we split the domain and application domain logic
 * (when there are multiple apps per domain), NotesList
 * would've belonged in the app domain, but there is only one app.
 */
export class NotesList {
  private selectedNotes: Set<UUID> = new Set();

  private _orderBy: OrderBy = "descending";

  constructor(
    private readonly newNoteProvider: NewNoteProvider,
    private readonly notesRepository: NotesRepository
  ) {
    makeObservable<NotesList, "selectedNotes" | "_orderBy">(this, {
      selectedNotes: observable,
      _orderBy: observable,
      addNoteFromExternalSource: action,
      orderBy: computed,
      listNotes: computed,
      numSelected: computed,
      predefinedDataAvailable: computed,
      addNote: action,
      setListOrder: action,
      toggleSelectNote: action,
    });
  }

  /**
   * Reads note from external source and adds it to DB
   */
  addNoteFromExternalSource(): Note {
    const newNote = this.newNoteProvider.getNewNote();
    return this.addNote(newNote);
  }

  /**
   * addNote should be used to add from user input, predefined source, CLI...
   */
  addNote(newNote: NewNoteData) {
    // TODO validation skipped because of time constraints
    // It should go here in the appication domain because
    // it's a conversion of core entities
    return this.notesRepository.addNote(newNote);
  }

  setListOrder(order: OrderBy) {
    this._orderBy = order;
  }

  get orderBy() {
    return this._orderBy;
  }

  toggleSelectNote(id: UUID) {
    if (this.selectedNotes.has(id)) {
      this.selectedNotes.delete(id);
    } else {
      this.selectedNotes.add(id);
    }
  }

  get listNotes(): NoteSelection[] {
    return this.notesRepository
      .listNotesBy(this._orderBy)
      .map((n) => ({ ...n, selected: this.selectedNotes.has(n.id) }));
  }

  get predefinedDataAvailable() {
    return this.newNoteProvider.isAvailable;
  }

  get numSelected() {
    return this.selectedNotes.size;
  }
}
