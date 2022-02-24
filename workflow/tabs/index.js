const DOMNodes = document.querySelectorAll('*');

for(let node of DOMNodes) {
    if(node.attributes.tabs) {
        node.classList.add('tabs')
        let i = -1;
        for(let tabBtnElem of node.firstElementChild.children) {
            i ++;
            tabBtnElem.addEventListener('click', e => {
                if(!tabBtnElem.classList.contains('active')) {

                    for(let tabBtn of node.firstElementChild.children) {
                        tabBtn.classList.remove('active');
                    }

                    for(let tabContent of node.lastElementChild.children) {
                        tabContent.style.display = 'none';
                    }

                    tabBtnElem.classList.add('active');
                    let index = Array.from(node.firstElementChild.children).indexOf(tabBtnElem);
                    // console.log(node.lastElementChild.children, index);
                    node.lastElementChild.children[index].style.display = 'block';
                }
            });
        }
    }
}
