import { App } from "./App";
import { ControlFactory } from "./Models";
import { LinuxFactory } from "./factories/LinuxFactory";
import { MacFactory } from "./factories/MacFactory";
import { WindowsFactory } from "./factories/WindowsFactory";

const getFactoryByOS = (): ControlFactory => {
  const userAgent = navigator.userAgent;

  if (userAgent.includes("Windows")) {
    return new WindowsFactory();
  }

  if (userAgent.includes("Linux")) {
    return new LinuxFactory();
  }

  if (userAgent.includes("MacOS")) {
    return new MacFactory();
  }

  throw new Error("Unknown OS");
}

try {
  const app = new App(getFactoryByOS());
  app.click();
  app.change();
}
catch (e: any) {
  window.alert(e.message);
}
