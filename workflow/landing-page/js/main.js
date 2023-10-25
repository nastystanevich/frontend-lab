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

class OneMoment {
    constructor(date) {
        if(date instanceof Date) {
            this.date = date;
        } else {
            this.date = new Date(date);
        }
    }

    format(formDate) {
        let year = this.date.getFullYear();
        let month = this.date.getMonth();
        let day = this.date.getDate();

        return formDate.replace(/YYYY/i, year).replace(/MM/i, month).replace(/DD/i, day);
    }

    formNow() {
        let differenceDate = Math.abs(Date.now() - this.date);
        let days = Math.ceil(differenceDate / (24 * 3600 * 1000));
        let years = Math.ceil(differenceDate / (365 * 24 * 3600 * 1000));

        if(days <= 1) {
            return `in ${days} day`;
        } else if (days <= 364) {
            return `in ${days} days`;
        } else {
            if(years === 1) {
                return '1 year ago';
            } else {
                return `${years} years ago`;
            }
        }
    }

    toDate() {
        return new Date(this.date);
    }

    static parse(data, formatDate) {
        const formYear = 'YYYY';
        const formMonth =  'MM';
        const formDay = 'DD';
        const year = data.slice(formatDate.indexOf(formYear), formatDate.indexOf(formYear) + 4);
        const month = +data.slice(formatDate.indexOf(formMonth), formatDate.indexOf(formMonth) + 2) - 1;
        const day = data.slice(formatDate.indexOf(formDay), formatDate.indexOf(formDay) + 2);

        return new Date(year, month, day);
    }
}

const someDate = new OneMoment(new Date(2023,10,10));
const anotherDate = OneMoment.parse('01202019', 'MMDDYYYY');


let data = someDate.toDate();

console.log('format(): ', someDate.format('YYYY/MM/DD'));
console.log('formNow(): ', someDate.formNow());
console.log('is instance of Date: ', data instanceof Date);
console.log('parse(): ', anotherDate instanceof Date, anotherDate)










