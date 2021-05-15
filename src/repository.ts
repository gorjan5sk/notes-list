import { action, computed, makeObservable, observable, when } from "mobx";
import { fromPromise } from "mobx-utils";
import {
  NewNoteData,
  NewNoteProvider,
  Note,
  NotesRepository,
  NoteWithTags,
  Tag,
} from "./domain";
import { UUID } from "./util";

async function fetchData(): Promise<NewNoteData[]> {
  return fetch("./assets/input-data.json").then((res) => res.json());
}

export class PredefinedNotesDB implements NewNoteProvider {
  private index: number = 0;

  private cache: NewNoteData[] | "none" = "none";

  constructor() {
    makeObservable<PredefinedNotesDB, "cache" | "setCache">(this, {
      cache: observable.ref,
      setCache: action,
      isAvailable: computed,
    });
    fetchData().then((data) => {
      this.setCache(data);
    });
  }

  private setCache(data: NewNoteData[]) {
    this.cache = data;
  }

  get isAvailable() {
    return this.cache != "none";
  }

  getNewNote() {
    if (this.cache === "none") {
      throw new Error("Predefined notes data is unavailable");
    }
    return this.cache[this.index++ % this.cache.length];
  }
}

class TagsDB {
  private tagsMap: Map<string, Tag> = new Map();

  /**
   * Idempotently get/create tag for label
   */
  private createTag(label: string): Tag {
    if (this.tagsMap.has(label)) return this.tagsMap.get(label)!;

    const id = UUID.generate();
    const tag: Tag = { id, label };
    this.tagsMap.set(label, tag);
    return tag;
  }

  createTags = (labels: string[]) =>
    labels.map((label) => this.createTag(label));

  /**
   * getTagIds belongs to TagsDB because ideally we'd only fetch/create
   * using a direct DB transaction
   */
  createGetTagIds = (labels: string[]) =>
    this.createTags(labels).map((t) => t.id);

  getLabels(tagIds: UUID[]): string[] {
    let labels: string[] = [];
    for (let tag of this.tagsMap.values()) {
      if (tagIds.includes(tag.id)) labels.push(tag.label);
    }
    return labels;
  }
}

export class NotesDB implements NotesRepository {
  private tagsDB: TagsDB = new TagsDB();

  private notes: Note[] = [];

  constructor() {
    makeObservable<NotesDB, "notes">(this, {
      notes: observable,
      addNote: action,
    });
  }

  listNotesBy(order: "ascending" | "descending"): NoteWithTags[] {
    const cmp =
      order === "ascending"
        ? (n1: Note, n2: Note) => n1.edited.getTime() - n2.edited.getTime()
        : (n1: Note, n2: Note) => -n1.edited.getTime() + n2.edited.getTime();
    const sortedNotes = this.notes.slice().sort(cmp);
    return sortedNotes.map((n) => ({
      ...n,
      tagLabels: this.tagsDB.getLabels(n.tagIds),
    }));
  }

  addNote(newNote: NewNoteData) {
    const tagLabels = Array.from(new Set(newNote.tagLabels));
    const tagIds = this.tagsDB.createGetTagIds(tagLabels);
    const id = UUID.generate();
    // Timestamp generation really should happen on the server because
    // the users' clock might be incorrect
    const [created, edited] = [new Date(), new Date()];
    const note: Note = { ...newNote, id, created, edited, tagIds };
    this.notes.push(note);
    return note;
  }
}
