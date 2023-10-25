export class KeyboardShortcut {
  keys: Set<string>;
  activateCommand: Function = () => {};

  constructor(...keys: Array<string>) {
    this.keys = new Set(keys);
  }

  public setCommand(command: Function): void {
    this.activateCommand = command;
  } 
}