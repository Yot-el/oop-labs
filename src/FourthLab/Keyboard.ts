import { KeyboardShortcut } from "./KeyboardShortcut";
import { debounce, compareSets } from "./interface/utils";

export class Keyboard {
  private activeShortcuts: Set<KeyboardShortcut>; // Набор активных сочетаний клавиш (и клавиш по отдельности)
  private pressedKeys: Set<String> = new Set(); // Нажатые клавиши на данный момент

  constructor(...shortcuts: Array<KeyboardShortcut>) {
    this.activeShortcuts = new Set([...shortcuts]);

    document.addEventListener('keydown', this.keydownHandler.bind(this));
  }

  private keydownHandler = (event: KeyboardEvent): void => { // Слушатель, срабатывающий по нажатию клавиши
    this.pressedKeys.add(event.code);
    this.activateWithDelay();
  }

  private activateWithDelay = debounce(() => { 
    this.activateCommand();
  }, 200);

  private activateCommand = (): void => {
    for (const shortcut of this.activeShortcuts) {
      // Разность множеств нажатых клавиш и клавиш одного из перебираемых шорткатов 
      if (!compareSets<String>(shortcut.getKeys(), this.pressedKeys)) {
        continue;
      }
      else {
        this.pressedKeys.clear();
        shortcut.doCommand();
        return;
      }
      
    }

    this.pressedKeys.clear();
  }

  public addShortcut(newShortcut: KeyboardShortcut): void {
    this.deleteShortcut(newShortcut.getKeys())

    this.activeShortcuts.add(newShortcut);
    console.log(this.activeShortcuts);
  }

  public deleteShortcut(keys: Set<string>): void {
    this.activeShortcuts.forEach((shortcut) => {
      if (compareSets<String>(shortcut.getKeys(), keys)) {
        this.activeShortcuts.delete(shortcut);
        return;
      }
    })
  }
}