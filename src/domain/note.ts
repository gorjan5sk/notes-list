import { UUID } from "../util";

export const noteTypes = [
  "rich-text",
  "code",
  "plain-text",
  "spreadsheet",
  "token-vault",
] as const;

export type NoteType = typeof noteTypes[number];

export interface NoteId {
  readonly id: UUID;

  readonly tagIds: UUID[];
  readonly created: Date;
  readonly edited: Date;
}

export interface CommonNoteData {
  readonly type: NoteType;

  readonly title: string;

  readonly private: boolean;
}

export interface RichTextData {
  readonly type: "rich-text";
  readonly document: string;
}

export interface PlainTextData {
  readonly type: "plain-text";
  readonly text: string;
}

export interface CodeData {
  readonly type: "code";
  readonly code: string;
}

export interface SpreadsheetData {
  readonly type: "spreadsheet";
  readonly sheet: Array<Array<number>>;
}

export interface TokenVaultData {
  readonly type: "token-vault";
  readonly secretData: string;
}

export type RichText = CommonNoteData & NoteId & RichTextData;
export type PlainText = CommonNoteData & NoteId & PlainTextData;
export type Code = CommonNoteData & NoteId & CodeData;
export type Spreadsheet = CommonNoteData & NoteId & SpreadsheetData;
export type TokenVault = CommonNoteData & NoteId & TokenVaultData;

export type Note = RichText | PlainText | Spreadsheet | TokenVault | Code;
