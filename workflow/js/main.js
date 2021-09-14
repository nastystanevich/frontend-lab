const menu = document.querySelector('.menu')
const menuList = document.querySelector('.menu__list');
const menuLinks = document.querySelectorAll('.menu__link');
const burgerMenuBtn = document.querySelector('.burger-menu__btn');
const burgerMenu = document.querySelector('.header-bottom-menu')

function showAndHideBurgerMenuBtnAndMenu() {
    if (window.innerWidth < 1000) {
        menuList.classList.remove('menu__list');
        menuList.classList.add('burger-menu__list_hidden');
        burgerMenuBtn.classList.remove('burger-menu__btn_hidden');
        burgerMenuBtn.classList.add('burger-menu__btn_active');
    } else {
        menuList.classList.remove('burger-menu__list_hidden', 'burger-menu__list_active');
        menuList.classList.add('menu__list');
        burgerMenuBtn.classList.remove('burger-menu__btn_active');
        burgerMenuBtn.classList.add('burger-menu__btn_hidden');
        menu.classList.remove('burger-menu_active');
        menuList.classList.remove('burger-menu__list_active');
        burgerMenu.classList.remove('header-bottom-menu_active');
        burgerMenu.classList.add('header-bottom-menu_hidden')
    }
}
window.addEventListener('resize', showAndHideBurgerMenuBtnAndMenu);


function showAndCloseBurgerMenu() {
    if (burgerMenu.classList.contains('header-bottom-menu_hidden')) {
        burgerMenu.classList.remove('header-bottom-menu_hidden');
        burgerMenu.classList.add('header-bottom-menu_active');
    } else {
        burgerMenu.classList.remove('header-bottom-menu_active');
        burgerMenu.classList.add('header-bottom-menu_hidden');
    }
}
burgerMenuBtn.addEventListener('click', showAndCloseBurgerMenu);

function closeBurgerMenu() {
    if (menu.classList.contains('burger-menu_active')) {
        menu.classList.remove('burger-menu_active');
        menuList.classList.add('burger-menu__list_hidden')
    }
}
menu.addEventListener('click', closeBurgerMenu);


function showAndCloseSubList(EO) {
    const target = EO.target.childNodes[1];
    if (target) {
        if (target.classList.contains('menu__sub-list_hidden')) {
            target.classList.remove('menu__sub-list_hidden');
            target.classList.add('menu__sub-list_active');
        } else if (target.classList.contains('menu__sub-list_active')) {
            target.classList.remove('menu__sub-list_active');
            target.classList.add('menu__sub-list_hidden');
        }
    }
}
menuLinks.forEach(link => {
    link.addEventListener('mouseover', showAndCloseSubList);
    link.addEventListener('mouseout', showAndCloseSubList);
});

const searchBtn = document.querySelector('.search-btn');
const searchForm = document.querySelector('.search-form');
const closeSearchFormBtn = document.querySelector('.close-search-form__btn');

function showSearchMenu() {
    searchForm.classList.remove('search-form_hidden');
    searchForm.classList.add('search-form_active');
}

searchBtn.addEventListener('click', showSearchMenu);

function closeSearchForm() {
    searchForm.classList.remove('search-form_active');
    searchForm.classList.add('search-form_hidden');
}

closeSearchFormBtn.addEventListener('click', closeSearchForm);