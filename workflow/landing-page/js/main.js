document.addEventListener('DOMContentLoaded', function() {
    initPopupDisplay();
    initBurger();
    renderCards();
    initPagination();
});

function initPopupDisplay() {
    const openPopupButton = document.getElementById('button-search');
    const searchPopup = document.getElementById('popup-search');

    openPopupButton.onclick = () => {
        searchPopup.classList.add('active');

        const closePopupButton = searchPopup.querySelector('.popup__close');

        if(searchPopup.classList.contains('active')) {
            closePopupButton.onclick = () => {
                searchPopup.classList.remove('active');
            }
        }
    };
}

function initBurger() {
    const burgerContainer = document.getElementById('burger');
    const burgerButton = document.getElementById('menu-button');

    burgerButton.onclick = () => {
        burgerContainer.classList.toggle('close-burger');
    }

}

let offset = 0;

async function getData() {
    try {
        const giphyUrl = `https://api.giphy.com/v1/gifs/search?api_key=hTfMt4wa3iLiabwXTQ1eTaKBiQ51Gr3J&q=cats&limit=9&offset=${offset}`;
        const response = await fetch(giphyUrl);

        return response.json();
    } catch (err) {
        console.log(`Error during request: ${err.message}`)

    }
}

async function renderCards() {
    const postsData = await getData();
    if (!postsData) return;
    const collectionCards = document.querySelectorAll('.blogs__item');

    postsData.data.forEach((el, i) => {
        const imageCard = collectionCards[i].querySelector('.image');
        const titleCard = collectionCards[i].querySelector('.blogs__title');
        const dateCard = collectionCards[i].querySelector('.blogs__date');
        const linkCard = collectionCards[i].querySelector('a');

        imageCard.src = el.images['original'].url;
        titleCard.innerText = el.title;
        dateCard.innerText = el['import_datetime'];
        linkCard.href = el.url;
    })
}

function initPagination() {
    const prevArrow = document.querySelector('.prev');
    const nextArrow = document.querySelector('.next');

    nextArrow.onclick = () => {
        offset += 9;
        renderCards();
    }

    prevArrow.onclick = () => {
        if(offset === 0) {
            return;
        }
        offset -= 9;
        renderCards();
    }
}










