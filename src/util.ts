import { v4 as uuidv4 } from "uuid";

export class UUID {
  constructor(private readonly id: string) {}

  toString() {
    return this.id;
  }

  static generate() {
    return new UUID(uuidv4());
  }
}
