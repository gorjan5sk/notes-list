import { when } from "mobx";
import React from "react";
import * as ReactDOM from "react-dom";

import { Controller } from "./controller";
import { NotesList } from "./domain";
import { Presenter } from "./presenter";
import { NotesDB, PredefinedNotesDB } from "./repository";
import {
  ContentComponent,
  NotesComponent,
  SelectOverlayComponent,
} from "./view";

const predefinedNotesDB = new PredefinedNotesDB();
const notesDB = new NotesDB();

const notes = new NotesList(predefinedNotesDB, notesDB);

const pr = new Presenter(notes);
const ctrl = new Controller(notes);

ReactDOM.render(
  <React.StrictMode>
    <NotesComponent pr={pr} ctrl={ctrl} />
    <ContentComponent />
    <SelectOverlayComponent pr={pr} />
  </React.StrictMode>,
  document.getElementById("root")
);

// Add a couple of notes when ready
when(
  () => pr.canAddNote,
  () => {
    for (let i = 0; i < 4; i++) {
      notes.addNoteFromExternalSource();
    }
  }
);
