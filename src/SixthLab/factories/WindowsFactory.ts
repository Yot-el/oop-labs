import { CustomButton, CustomInput, ControlFactory } from "../Models";

class WindowsButton implements CustomButton {
  click(): string {
    return "Windows click"
  }
}

class WindowsInput implements CustomInput {
  change(): string {
      return "Windows input change"
  }
}

export class WindowsFactory implements ControlFactory {
  public createButton(): CustomButton {
    return new WindowsButton();
  }
  public createInput(): CustomInput {
    return new WindowsInput();
  }
}