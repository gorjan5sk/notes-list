import React from "react";
import { observer } from "mobx-react-lite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Controller } from "../../controller";
import { NoteItemView, Presenter } from "../../presenter";
import { determineIcon } from "./determine-icon";

import { faHashtag, faLock } from "@fortawesome/free-solid-svg-icons";
import { NoteType } from "../../domain";
import { HorizontalDivider } from "../divider";

import "./notes.css";

const TagsComponent: React.FC<{ tags: string[] }> = ({ tags }) => (
  <div className="note-tags-line">
    {tags.map((t) => (
      <div key={t} className="note-tag">
        <div className="note-tag-icon">
          <FontAwesomeIcon icon={faHashtag} />
        </div>
        <div className="note-tag-text noselect">{t}</div>
      </div>
    ))}
  </div>
);

const Icon: React.FC<{ type: NoteType }> = (p) => {
  const { icon, color } = determineIcon(p.type);
  return <FontAwesomeIcon color={color} icon={icon} />;
};

const NoteComponent: React.FC<{ note: NoteItemView; ctrl: Controller }> = ({
  note,
  ctrl,
}) => (
  <>
    <div
      className={`note-component ${
        note.selected ? `note-component-selected` : ""
      }`}
      onClick={() => ctrl.clickNote(note.id)}
    >
      <div className="note-icon">
        <Icon type={note.type} />
      </div>
      <div className="note-content">
        <div className="note-title noselect">{note.title}</div>
        {note.body != null ? (
          <div className="note-body noselect">{note.body}</div>
        ) : null}
        <div className="note-date noselect">{note.date}</div>
        {note.tags.length > 0 ? <TagsComponent tags={note.tags} /> : null}
      </div>
      {note.private ? (
        <div className="note-private">
          <FontAwesomeIcon icon={faLock} />
        </div>
      ) : null}
    </div>
    <HorizontalDivider addClass={["note-divider-offset"]} />
  </>
);

export const NotesListComponent: React.FC<{
  pr: Presenter;
  ctrl: Controller;
}> = observer(({ pr, ctrl }) => (
  <div className="notes-list-component">
    {pr.listNotes.map((n) => (
      <NoteComponent key={n.id.toString()} note={n} ctrl={ctrl} />
    ))}
  </div>
));
