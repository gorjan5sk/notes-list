import { UUID } from "../util";

export interface Tag {
  readonly id: UUID;
  readonly label: string;
}
