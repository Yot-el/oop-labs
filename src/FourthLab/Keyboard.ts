import { KeyboardShortcut } from "./KeyboardShortcut";
import { debounce, compateSets } from "./interface/utils";

export class Keyboard {
  private activeShortcuts: Set<KeyboardShortcut>; // Набор активных сочетаний клавиш (и клавиш по отдельности)
  private pressedKeys: Set<String> = new Set(); // Нажатые клавиши на данный момент
  private isWaiting: boolean = false;

  constructor(...shortcuts: Array<KeyboardShortcut>) {
    this.activeShortcuts = new Set([...shortcuts]);

    document.addEventListener('keydown', this.keydownHandler.bind(this));
    document.addEventListener('keyup', this.keyupHandler.bind(this));
  }

  private keydownHandler = (event: KeyboardEvent): void => { // Слушатель, срабатывающий по нажатию клавиши
    this.isWaiting = true;
    this.pressedKeys.add(event.code);
    this.activateWithDelay();
  }

  private keyupHandler = (event: KeyboardEvent): void => { // Слушатель, срабатывающий по отпусканию клавиши
    if (this.isWaiting) {
      return;
    }
    this.pressedKeys.delete(event.code);
  }

  private activateWithDelay = debounce(() => { 
    this.activateCommand();
  }, 200);

  private activateCommand = (): void => {
    for (const shortcut of this.activeShortcuts) {
      // Разность множеств нажатых клавиш и клавиш одного из перебираемых шорткатов 
      if (!compateSets(shortcut.keys, this.pressedKeys)) {
        continue;
      }
      else {
        this.isWaiting = false;
        this.pressedKeys.clear();
        shortcut.activateCommand();
        return;
      }
      
    }

    this.isWaiting = false;
    this.pressedKeys.clear();
  }

  public addShortcut(newShortcut: KeyboardShortcut): void {
    this.activeShortcuts.forEach((shortcut) => {
      if (compateSets(shortcut.keys, newShortcut.keys)) {
        this.deleteShortcut(shortcut.keys);
      }
    })

    this.activeShortcuts.add(newShortcut);
    console.log(this.activeShortcuts);
  }

  public deleteShortcut(keys: Set<string>): void {
    this.activeShortcuts.forEach((shortcut) => {
      if (compateSets(shortcut.keys, keys)) {
        this.activeShortcuts.delete(shortcut);
        return;
      }
    })
  }
}