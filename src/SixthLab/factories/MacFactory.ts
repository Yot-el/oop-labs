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
  public createButton(): CustomButton {
    return new MacButton();
  }
  public createInput(): CustomInput {
    return new MacInput();
  }
}