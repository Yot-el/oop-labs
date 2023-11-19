const app = document.querySelector('#app');

export const setPage = (html: string) => {
  app?.lastElementChild?.remove();

  const el = document.createElement('div');
  el.innerHTML = html;
  app?.append(<Node>el.firstChild);
}