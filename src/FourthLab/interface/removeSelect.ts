const selectRemove = document.querySelector('#sh-select-remove');

const createOption = (shortcut: string): Node => {
  const el = document.createElement('div');
  el.innerHTML = `<option id="${shortcut}">${shortcut}</option>`;
  return <Node>el.firstChild;
}

const updateRemoveSelect = (type: 'delete' | 'add', shortcut: string): void => {
  if (type === 'add') {
    const option = createOption(shortcut);
    selectRemove?.append(option);
  }
  else if (type === 'delete') {
    const optionId = `#${shortcut}`
    selectRemove?.querySelector(optionId)?.remove();
  }
}

const getRemoveSelectValue = (): string => {
  const selectedOption = selectRemove?.querySelector('option:checked');
  return selectedOption?.getAttribute('id') ?? "";
}

export { updateRemoveSelect, getRemoveSelectValue }