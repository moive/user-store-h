import { v7 as uuidv7 } from "uuid";

export class UuidAdapter {
  static v7 = () => uuidv7();
}
