import React from "react";
import * as ReactDOM from "react-dom";

import { NotesListComponent } from "./list";
import { NotesToolbarComponent } from "./toolbar";

import "./fonts/fonts.css";
import "./main.css";

const NotesComponent: React.FC<{}> = () => (
  <div className="notes-component">
    <NotesToolbarComponent />
    <div className="notes-list-divider" />
    <NotesListComponent />
  </div>
);

const ContentComponent: React.FC<{}> = () => (
  <div className="content-component"></div>
);

ReactDOM.render(
  <React.StrictMode>
    <NotesComponent />
    <ContentComponent />
  </React.StrictMode>,
  document.getElementById("root")
);
