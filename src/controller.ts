import { action, makeObservable } from "mobx";
import { NotesList, OrderBy } from "./domain";
import { UUID } from "./util";

export class Controller {
  constructor(private readonly notes: NotesList) {
    makeObservable(this, {
      clickAdd: action,
      clickReorder: action,
      clickNote: action,
    });
  }

  clickAdd() {
    this.notes.addNoteFromExternalSource();
  }

  clickReorder() {
    const order: OrderBy =
      this.notes.orderBy === "ascending" ? "descending" : "ascending";
    this.notes.setListOrder(order);
  }

  clickNote(id: UUID) {
    this.notes.toggleSelectNote(id);
  }
}
