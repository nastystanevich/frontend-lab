document.addEventListener('DOMContentLoaded', function() {
    popupDisplay();
    showBurger()
});

function popupDisplay() {
    const buttonSearch = document.getElementById('button-search');
    const popupSearch = document.getElementById('popup-search');

    buttonSearch.onclick = () => {
        popupSearch.classList.add('active');

        const buttonClose = popupSearch.querySelector('.popup__close');

        if(popupSearch.classList.contains('active')) {
            buttonClose.onclick = () => {
                popupSearch.classList.remove('active');
            }
        }
    };
}

function showBurger() {
    const burgerContent = document.getElementById('burger');
    const burgerButton = document.getElementById('menu-button');

    if(burgerContent.classList.contains('close-burger')) {
        burgerButton.onclick = () => {
            burgerContent.classList.toggle('close-burger');
        }
    }
}

