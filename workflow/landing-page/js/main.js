document.addEventListener('DOMContentLoaded', function() {
    popupDisplay();
    showBurger();
    createPagination();
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
    const dataApi = 'https://api.giphy.com/v1/gifs/search?api_key=hTfMt4wa3iLiabwXTQ1eTaKBiQ51Gr3J&q=cats&limit=36&offset=9';
    const response = await fetch(dataApi)
    const data = await response.json();
    return data;
}

async function createPagination() {
    const postsData = await getData();
    const cards = 9;
    let pages = postsData.data.length / cards;
    let currentPage = 1;

    function initCards(arrData, cardsPerPage, page) {
        const collectionCards = document.querySelectorAll('.blogs__item');
        const start = (page - 1) * cardsPerPage;
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

        initPagination();
    }

    initCards(postsData, cards, currentPage);

    function initPagination() {
        const prevArrow = document.querySelector('.prev');
        const nextArrow = document.querySelector('.next');
        //
        // for (let i = 1; i <= pages; i++) {
        //     let liBtn = document.createElement('li');
        //     liBtn.className = 'arrows__item';
        //     liBtn.innerText = `${i}`;
        //     nextArrow.before(liBtn);
        // }

        nextArrow.onclick = () => {
            currentPage++;
            initCards(postsData, cards, currentPage);
        }

        prevArrow.onclick = () => {
            currentPage--;
            initCards(postsData, cards, currentPage);
        }

        if (currentPage > pages) {
            currentPage = pages;
        } else if(currentPage < 1) {
            currentPage = 1;
        }
    }
}




