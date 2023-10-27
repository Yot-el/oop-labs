export class KeyboardShortcut {
  private keys: Set<string>;
  private activateCommand: Function = () => {};

  constructor(command: Function, ...keys: Array<string>) {
    this.activateCommand = command;
    this.keys = new Set(keys);
  }

  public doCommand = () => {
    setTimeout(() => {
      this.activateCommand();
    }, 1000)
  }
  
  public getKeys = (): Set<string> => {
    return this.keys;
  }
}