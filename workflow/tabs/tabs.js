const headTabsButtons = document.querySelector('.tabs__header');
const containerTabsContent = document.querySelector('.tabs__body')

headTabsButtons.onclick = (e) => {
    const currentTabsButton= e.target.closest('.tabs__item')
    if(!currentTabsButton){ return; }
    if(currentTabsButton.classList.contains('tabs__item_active')) { return; }
    const activeButton = headTabsButtons.querySelector('.tabs__item_active');
    const activeTabsContent = containerTabsContent.querySelector('.tabs__content_active');

    const attributeCurrentButton = currentTabsButton.dataset.tab;
    const currentTabsContent = containerTabsContent.querySelector(`[data-tab=${attributeCurrentButton}]`)

    activeButton.classList.remove('tabs__item_active');
    currentTabsButton.classList.add('tabs__item_active');

    activeTabsContent.classList.remove('tabs__content_active');
    currentTabsContent.classList.add('tabs__content_active');
}