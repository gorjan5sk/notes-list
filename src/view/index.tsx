import React from "react";
import { observer } from "mobx-react-lite";

import { NotesListComponent } from "./list";
import { NotesToolbarComponent } from "./toolbar";

import { Presenter } from "../presenter";
import { Controller } from "../controller";

import "./fonts/fonts.css";
import "./index.css";
import { HorizontalDivider } from "./divider";

export * from "./overlay-select";

export const NotesComponent: React.FC<{
  pr: Presenter;
  ctrl: Controller;
}> = observer(({ pr, ctrl }) => (
  <div className="notes-component">
    <NotesToolbarComponent pr={pr} ctrl={ctrl} />
    <HorizontalDivider />
    <NotesListComponent pr={pr} ctrl={ctrl} />
  </div>
));

export const ContentComponent: React.FC<{}> = () => (
  <div className="content-component" />
);
