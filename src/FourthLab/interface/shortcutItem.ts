const list = document.querySelector('.shortcuts__list');

const createItem = (keys: string, className: string = ""): Node => {
  const el = document.createElement('div');
  el.innerHTML = `<li class="shortcut__item ${className}">${keys}</li>`

  return <Node>el.firstChild;
}

const addItemToList = (item: Node): void => {
  list?.append(item);
}

const deleteLastItem = () => {
  list?.lastElementChild?.remove();
}

export {createItem, addItemToList, deleteLastItem};