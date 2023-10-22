document.addEventListener('DOMContentLoaded', function() {
    popupDisplay();
    showBurger();
    // getData();
    // createPagination();
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

async function getData() {
    const dataApi = 'https://api.giphy.com/v1/gifs/search?api_key=hTfMt4wa3iLiabwXTQ1eTaKBiQ51Gr3J&q=cats&limit=27&offset=9';
    const response = await fetch(dataApi)
    const data = await response.json();
    console.log(data);
    return data;
}

async function createPagination() {
    const postsData = await getData();
    let currentPage = 1;
    let cards = 9;

    function initList(arrData, cardsPerPage, page) {
        const collectionCards = document.querySelectorAll('.blogs__item');
        const start = cardsPerPage * page;
        const end = start + cardsPerPage;
        const paginatedData = arrData.data.slice(start, end);

        paginatedData.forEach((el, i) => {
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

    initList(postsData, cards, currentPage);
    // function initPagination() {}
}

createPagination();




