document.addEventListener("DOMContentLoaded", photo);

function photo() {
    const numberPage = document.getElementById('numberPage');
    const numberPhoto = document.getElementById('numberPhoto');
    const errorPage = document.querySelector('.errorPage');
    const errorPhoto = document.querySelector('.errorPhoto');
    const bothError = document.querySelector('.bothError');
    const btn = document.querySelector('.btn');
    const sectionPhoto = document.querySelector('.photo');

    if (localStorage.getItem("numberPage") !== null || localStorage.getItem("numberPhoto") !== null) {
        numberPage.value = +localStorage.getItem("numberPage");
        numberPhoto.value = +localStorage.getItem("numberPhoto");
        getResult(+localStorage.getItem("numberPage"),+localStorage.getItem("numberPhoto")); 
    };

    btn.addEventListener('click', showImage);

    function showImage() {
        if (!ckeckInput(numberPage, numberPhoto)) {return};
        getResult(+numberPage.value,numberPhoto.value);  
    };

    function ckeckInput(numberPage, numberPhoto) {
        errorPage.innerHTML = '';
        errorPhoto.innerHTML = '';
        bothError.innerHTML = '';
        let resultPage = isNaN(+numberPage.value) && numberPage.value !=='' || +numberPage.value < 1 || +numberPage.value > 10;
        let resultPhoto = isNaN(+numberPhoto.value) && numberPhoto.value !=='' || +numberPhoto.value < 1 || +numberPhoto.value > 10;
        if (resultPage && resultPhoto) {
            bothError.innerHTML = `Номер страницы и лимит вне диапазона от 1 до 10`;
            return false;
        };
        if (resultPage) {
            errorPage.innerHTML = `Номер страницы вне диапазона от 1 до 10`;
            return false;
        };
        if (resultPhoto) {
            errorPhoto.innerHTML = `Лимит вне диапазона от 1 до 10`;
             return false;
        };
        return true;
    };

    function getResult(page,photo) {
        const url = `https://picsum.photos/v2/list?page=${page}&limit=${photo}`;
        fetch(url)
        .then((response) => {return response.json();})
        .then((objPhotos) => {
            let html = listOfPhotos(objPhotos,createOnePhoto);
            sectionPhoto.innerHTML = html;
            localStorage.setItem("numberPage", numberPage.value);
            localStorage.setItem("numberPhoto", numberPhoto.value);
        })
        .catch(() => {console.log('Ошибка')});
    };

    function listOfPhotos(photos,cb) { 
        let startList = `<ul class="photo__list">`;
        let itemList = '';
        for (let photo in photos) {
            itemList += cb(photos[photo]);
        };
        let endList = '</ul>';
        return startList+itemList+endList;
    };
    
    function createOnePhoto(photo) {
        let id, author, width, height, url, download_url;
        for (let property in photo) {
        switch(property) {
            case 'id': id = photo[property]; break;
            case 'author': author = photo[property]; break;
            case 'width': width = photo[property]; break;
            case 'height': height = photo[property]; break;
            case 'url': url = photo[property]; break;
            case 'download_url': download_url = photo[property]; break;
            };
        };
        return `<li class="photo__item">
        <div class="photo__image" id="${id}" style="background-image: url('${download_url}')">
        <div class="photo__inner">
            <div class="photo__topBlock">
                <p class="photo__desc">Автор: ${author}</p>
                <p class="photo__desc">Ширина: ${width} px</p>
                <p class="photo__desc">Высота: ${height} px</p>
            </div>
            <div class="photo__bottomBlock">
               <a class="photo__link" href="${url}" target="_blank">Скачать фото</a>
            </div>
        </div>
        </div></li>`;
    };
};