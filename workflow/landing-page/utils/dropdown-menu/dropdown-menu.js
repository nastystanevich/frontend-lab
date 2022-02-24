class DropdownMenu {
    /**
     * @param {Array<string>} list
     */
    constructor(list) {
        this._list = [];
        this._elemList = [];
        this._targetElem = null;
        this._leaveTimeout = null;
        this._hidden = true;

        this._menuElem = document.createElement('div');
        this._menuElem.classList.add('dropdown-menu-wrapper');
        this._menuElem.style.opacity = '0';
        document.body.appendChild(this._menuElem);

        const triangle = document.createElement('div');
        triangle.style.clipPath = 'polygon(50% 0%, 0 100%, 100% 100%)';
        triangle.style.width = '20px';
        triangle.style.height = '20px';
        this._menuElem.appendChild(triangle);

        this._ulElem = document.createElement('ul');
        this._ulElem.classList.add('dropdown-menu');
        this._menuElem.appendChild(this._ulElem);

        for(let item of list) {
            this.addItem(item);
        }

        this._menuElem.addEventListener('mouseenter', this._onMouseEnterMenu.bind(this));
        this._menuElem.addEventListener('mouseleave', this._onMouseLeaveMenu.bind(this));
    }

    addItem(text) {
        this._list.push(text);

        const li = document.createElement('li');
        li.classList.add('dropdown-menu__item');
        li.textContent = text;
        this._ulElem.appendChild(li);

        this._elemList.push(li);
    }

    _onMouseLeaveTarget() {
        if(this._hidden) return;
        if(this._leaveTimeout) {
            clearTimeout(this._leaveTimeout);
        }
        this._leaveTimeout = setTimeout(() => {
            this.hide();
        }, 300);
    }

    _onMouseLeaveMenu() {
        if(this._hidden) return;
        if(this._leaveTimeout) {
            clearTimeout(this._leaveTimeout);
        }

        this.hide();
    }

    _onMouseEnterMenu() {
        if(this._hidden) return;
        if(this._leaveTimeout) {
            clearTimeout(this._leaveTimeout);
        }
    }

    attachToElement(elem, offsetTop = 25) {
        const elemRect = elem.getBoundingClientRect();
        const dropdownWidth = this._menuElem.getBoundingClientRect().width;

        this._menuElem.style.left = (elemRect.x + elemRect.width / 2 - dropdownWidth / 2) + 'px';
        this._menuElem.style.top = (elemRect.y + offsetTop) + 'px';

        this._menuElem.style.opacity = '100';
        this._hidden = false;

        this._targetElem = elem;
        this._targetElem.addEventListener('mouseleave', this._onMouseLeaveTarget.bind(this));
    }

    hide() {
        this._menuElem.style.opacity = '0';
        this._hidden = true;
    }

    destroy() {
        this._menuElem.removeEventListener('mouseenter', this._onMouseEnterMenu);
        this._menuElem.removeEventListener('mouseleave', this._onMouseLeaveMenu);
        this._targetElem.removeEventListener('mouseleave', this._onMouseLeaveTarget);
        document.body.removeChild(this._menuElem);
    }
}
