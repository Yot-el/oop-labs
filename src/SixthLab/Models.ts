interface CustomButton {
  click(): string;
}

interface CustomInput {
  change(): string;
}

interface ControlFactory {
  createButton(): CustomButton;
  createInput(): CustomInput;
}

export type { CustomButton, CustomInput, ControlFactory }