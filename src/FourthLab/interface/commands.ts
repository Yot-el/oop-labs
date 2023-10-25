import { parseKeysSet } from "./utils";
import { createItem, addItemToList, deleteLastItem } from "./shortcutItem";

export const commands: Record<string, any> = {
  "shortcut-default": function() {
    const item = createItem(parseKeysSet(this.keys));
    addItemToList(item);
  },
  "shortcut-zoom": function() {
    const item = createItem(parseKeysSet(this.keys), "shortcut__item--zoom-in");
    addItemToList(item);
  },
  "delete-last": function() {
    deleteLastItem();
  }
}