import React from "react";
import { newNoteArb } from "./generator";
import { render } from "enzyme";
import { NewNoteProvider, NotesList } from "../src/domain";
import { NotesDB } from "../src/repository";
import { Controller } from "../src/controller";
import { Presenter } from "../src/presenter";
import { NotesComponent } from "../src/view";
import fc from "fast-check";

const initNewNoteProvider = (): NewNoteProvider => ({
  isAvailable: true,
  getNewNote: () => fc.sample(newNoteArb, 1)[0],
});

test("it adds and sorts items", () => {
  const newNoteProvider = initNewNoteProvider();
  const notesRepo = new NotesDB();
  const notes = new NotesList(newNoteProvider, notesRepo);
  const ctrl = new Controller(notes);
  const pres = new Presenter(notes);
  for (let i = 0; i < 10; i++) {
    ctrl.clickAdd();
  }
  const noteComp = render(<NotesComponent pr={pres} ctrl={ctrl} />);

  expect(noteComp.find(".note-component")).toHaveLength(10);
});
