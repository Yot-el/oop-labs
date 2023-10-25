const tabs = document.querySelectorAll(".shortcuts-actions__tab-input");
let activeTab = document.querySelector('.shortcuts-actions__tab-content--active');

const initTab = () => {
  tabs.forEach((tab) => {
    tab.addEventListener('change', (event) => {
      // @ts-ignore
      const contentId = `#${event.target.id}-content`;
      const newActiveTab = document.querySelector(contentId);
  
      activeTab?.classList.remove('shortcuts-actions__tab-content--active');
      activeTab = newActiveTab;
      activeTab?.classList.add('shortcuts-actions__tab-content--active');
    })
  });
}

export { initTab };
