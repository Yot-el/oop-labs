import { updateRemoveSelect, getRemoveSelectValue } from './interface/removeSelect';
import { parseKeysString } from './interface/utils';
import { initTab } from './interface/Tabs';
import { Keyboard } from './Keyboard';
import { KeyboardShortcut } from './KeyboardShortcut';
import { commands } from './interface/commands';

initTab();

const keyboard = new Keyboard();

const removeShortcutButton = document.querySelector('#sh-button-remove');
removeShortcutButton?.addEventListener('click', () => {
  const stringKeys = getRemoveSelectValue();
  keyboard.deleteShortcut(parseKeysString(stringKeys));
  updateRemoveSelect('delete', stringKeys);
})

const addShortcutButton = document.querySelector('#sh-button-add');
const addShortcutInput = <HTMLInputElement>document.querySelector('#sh-input-add');
const addShortcutSelect = document.querySelector('#sh-select-add');

addShortcutButton?.addEventListener('click', () => {
  const stringKeys = addShortcutInput.value;
  const functionName = addShortcutSelect?.querySelector('option:checked')?.getAttribute('value') ?? "shortcut-default";

  const shortcut = new KeyboardShortcut(commands[functionName], ...parseKeysString(stringKeys));
  keyboard.addShortcut(shortcut);
  updateRemoveSelect('add', stringKeys);
})