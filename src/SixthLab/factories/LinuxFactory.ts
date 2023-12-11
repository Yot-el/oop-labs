import { CustomButton, CustomInput, ControlFactory } from "../Models";

class LinuxButton implements CustomButton {
  click(): string {
    return "linux click"
  }
}

class LinuxInput implements CustomInput {
  change(): string {
      return "linux input change"
  }
}

export class LinuxFactory implements ControlFactory {
  public createButton(): CustomButton {
    return new LinuxButton();
  }
  public createInput(): CustomInput {
    return new LinuxInput();
  }
}