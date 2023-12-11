import { ControlFactory, CustomButton, CustomInput } from "./Models";

export class App {
  private button: CustomButton;
  private input: CustomInput;

  constructor(factory: ControlFactory) {
    this.button = factory.createButton();
    this.input = factory.createInput();
  }

  public click(): void {
    window.alert(this.button.click());
  }

  public change(): void {
    window.alert(this.input.change());
  }
}