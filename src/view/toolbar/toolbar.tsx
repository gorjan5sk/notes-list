import React from "react";
import {
  faSortAmountDown,
  faSortAmountUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { Controller } from "../../controller";
import { Presenter } from "../../presenter";

import { RoundButton } from "./button";

import "./toolbar.css";
import { observer } from "mobx-react-lite";

type SortDirection = "ascending" | "descending";
const determineSortIcon = (d: SortDirection) =>
  d === "ascending" ? faSortAmountUp : faSortAmountDown;

const SortButton: React.FC<{
  direction: "ascending" | "descending";
  onClick: () => void;
}> = (p) => (
  <RoundButton
    icon={determineSortIcon(p.direction)}
    type="normal"
    onClick={p.onClick}
  />
);

const AddNoteButton: React.FC<{ onClick: () => void }> = (p) => (
  <RoundButton icon={faPlus} type="primary" onClick={p.onClick} />
);

const Splitter: React.FC<{}> = () => <div style={{ width: 19 }} />;

export const NotesToolbarComponent: React.FC<{
  pr: Presenter;
  ctrl: Controller;
}> = observer(({ pr, ctrl }) => (
  <div className="notes-toolbar-component">
    <div className="notes-toolbar-container">
      <div className="notes-toolbar-title noselect">Notes</div>
      <SortButton
        direction={pr.orderedBy}
        onClick={() => ctrl.clickReorder()}
      />
      <Splitter />
      {pr.canAddNote ? <AddNoteButton onClick={() => ctrl.clickAdd()} /> : null}
    </div>
  </div>
));
