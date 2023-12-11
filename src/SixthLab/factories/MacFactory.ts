import { CustomButton, CustomInput, ControlFactory } from "../Models";

class MacButton implements CustomButton {
  click(): string {
    return "Mac click"
  }
}

class MacInput implements CustomInput {
  change(): string {
      return "Mac input change"
  }
}

export class MacFactory implements ControlFactory {
  createButton(): CustomButton {
    return new MacButton();
  }
  createInput(): CustomInput {
    return new MacInput();
  }
}