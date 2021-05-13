import React from "react";
import {
  faSortAmountDown,
  faSortAmountUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { RoundButton } from "./button";

import "./toolbar.css";

type SortDirection = "ascending" | "descending";
const determineSortIcon = (d: SortDirection) =>
  d === "ascending" ? faSortAmountUp : faSortAmountDown;

const SortButton: React.FC<{ direction: "ascending" | "descending" }> = (p) => (
  <RoundButton icon={determineSortIcon(p.direction)} type="normal" />
);

const AddNoteButton: React.FC<{}> = () => (
  <RoundButton icon={faPlus} type="primary" />
);

const Splitter: React.FC<{}> = () => <div style={{ width: 19 }} />;

export const NotesToolbarComponent: React.FC<{}> = () => (
  <div className="notes-toolbar-component">
    <div className="notes-toolbar-container">
      <div className="notes-toolbar-title">Notes</div>
      <SortButton direction={"descending"} />
      <Splitter />
      <AddNoteButton />
    </div>
  </div>
);
