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
  createButton(): CustomButton {
    return new WindowsButton();
  }
  createInput(): CustomInput {
    return new WindowsInput();
  }
}