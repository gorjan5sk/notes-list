import {
  faAlignLeft,
  faCode,
  faFileAlt,
  faKey,
  faTable,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { NoteType } from "../../domain";

export function determineIcon(
  t: NoteType
): { icon: IconDefinition; color: string } {
  switch (t) {
    case "rich-text":
      return { icon: faFileAlt, color: "#086DD6" };
    case "plain-text":
      return { icon: faAlignLeft, color: "#7049CF" };
    case "code":
      return { icon: faCode, color: "#086DD6" };
    case "spreadsheet":
      return { icon: faTable, color: "#1AA772" };
    case "token-vault":
      return { icon: faKey, color: "#F28C52" };
  }
}
