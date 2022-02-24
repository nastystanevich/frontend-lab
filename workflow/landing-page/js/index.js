
const projectsDropdown = new DropdownMenu(['Project 1', 'Project 2', 'Project 3']);
const blogDropdown = new DropdownMenu(['Article 1', 'Article 2', 'Article 3']);
const pagesDropdown = new DropdownMenu(['Page 1', 'Page 2', 'Page 3']);

const projectsLink = document.getElementById('dropdown-projects');
const blogLink = document.getElementById('dropdown-blog');
const pagesLink = document.getElementById('dropdown-pages');

const dropDowns = [projectsDropdown, blogDropdown, pagesDropdown];
const links = [projectsLink, blogLink, pagesLink];

for(let i = 0; i < links.length; i++) {
    const link = links[i];
    const dropDown = dropDowns[i];

    link.onmouseenter = () => {
        dropDown.attachToElement(link);
        for(let drop of dropDowns) {
            if(drop !== dropDown) {
                drop.hide();
            }
        }
    }
}

document.getElementById('burger-button').addEventListener('click', e => {
    const mobileNavigation = document.getElementById('mobile-navigation');
    mobileNavigation.style.display = mobileNavigation.style.display === 'none' ? 'block' : 'none';
});

window.gifPage = 0;

async function fetchGIFs(page = 0) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=MSOYBlKRcKqtms6az3Cbom51doE0t0xO&q=dogs&limit=9&offset=${page*9}&rating=g&lang=en`)
    const data = await response.json();
    const blogCardsElem = document.getElementById('blog-cards');
    blogCardsElem.innerHTML = '';

    const gifs = data.data;

    console.log(gifs.length)

    for(let gif of gifs) {
        const gifURL = gif.images.original.url;
        const gifTitle = gif.title;
        const gifDate = gif.import_datetime;

        blogCardsElem.innerHTML += `
        <div class="blog-card">
            <div class="blog-card__image">
                <img src="${gifURL}" alt="">
                <div class="blog-card__image-overlay">
                    <a href="${gif.url}" target="_blank" class="blog-card__image-btn"><i class="fa fa-link"></i></a>
                </div>
            </div>
            <div class="blog-card__content">
                <h4 class="blog-card__title">${gifTitle}</h4>
                <div class="blog-card__date">${gifDate}</div>
                <div class="blog-card__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, optio.</div>
            </div>
        </div>
        `
    }
}

function updatePageText(page) {
    document.getElementById('pageText').innerText = 'Page '+page;
}

document.getElementById('prevPage').addEventListener('click', e => {
    if(window.gifPage > 0) {
        window.gifPage --;
        updatePageText(window.gifPage+1)
        fetchGIFs(window.gifPage);
    }
});

document.getElementById('nextPage').addEventListener('click', e => {
    window.gifPage ++;
    updatePageText(window.gifPage+1)
    fetchGIFs(window.gifPage);
});

window.onload = () => {

    fetchGIFs()

}
