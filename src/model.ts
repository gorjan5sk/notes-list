export interface Note {
  title: string;
  body: string;
  icon: string;
  tags: string[];
  locked: boolean;

  created: Date;
  edited: Date;
}

export class NotesList {
  constructor() {}
}
