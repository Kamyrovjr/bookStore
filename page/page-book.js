const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id');

axios.get(`https://65bc9541b51f9b29e931ca00.mockapi.io/book/book/${bookId}`)
  .then(response => {
    if (response.data) {
      const apiData = response.data;
      PageBooksFromApi(apiData);
    } else {
      console.error('Данные отсутствуют в ответе API');
    }
  })
  .catch(error => console.error('Ошибка при получении данных из API:', error));


function PageBooksFromApi(apiData) {
const booksContainer = document.querySelector('.main__section__wrapper');

const bookDivContainer = document.createElement('div');
bookDivContainer.className = 'main__section__wrapper__books-container';

const imgDiv = document.createElement('div');
imgDiv.className = 'main__section__wrapper__books-container__img';

const img = document.createElement('img');
img.src = apiData.avatar;
img.alt = '';
img.width = '295';
img.height = '405';

const buttonBlockDiv = document.createElement('div');
buttonBlockDiv.className = 'main__section__wrapper__books-container__button-block';

const cartBtn = document.createElement('button');
cartBtn.className = 'main__section__wrapper__books-container__button-block__cart-bnt';
cartBtn.textContent = 'Добавить в корзину'


cartBtn.addEventListener('click', function() {
  const bookId = apiData.id; 
  const bookName = apiData.name;
  const bookPrice = apiData.price.now;
  const bookImg = apiData.avatar



  const bookData = {
      id: bookId,
      name: bookName,
      price: bookPrice,
      avatar: bookImg
  };

axios.post('https://65bc9541b51f9b29e931ca00.mockapi.io/cart', bookData)
    .then(response => {
      console.log('Книга успешно добавлена в корзину:', response.data)
    })
    .catch(error => {
        console.error('Ошибка при добавлении книги в корзину:', error);
    });
});

    

const buttonImg = document.createElement('img');
buttonImg.src = "/img/cart.svg";
buttonImg.alt = '';
buttonImg.width = '25';
buttonImg.height = '22';

const readOnlineBtn = document.createElement('button');
readOnlineBtn.className = 'main__section__wrapper__books-container__button-block__read-online';
readOnlineBtn.textContent = 'Читать онлайн';

const wrapperDiscription = document.createElement('div');
wrapperDiscription.className = 'main__section__wrapper__discription';

const bookName = document.createElement('h2');
bookName.className = 'main__section__wrapper__discription__title';
bookName.textContent = apiData.name;

const bookAuthor = document.createElement('p');
bookAuthor.className = 'main__section__wrapper__discription__text';
bookAuthor.textContent = `Автор: ${apiData.author}`;

const bookGenre = document.createElement('p');
bookGenre.className = 'main__section__wrapper__discription__text';
bookGenre.textContent = `Жанр: ${apiData.genre}`;

const bookDiscription = document.createElement('p');
bookDiscription.className = 'main__section__wrapper__discription__text';
bookDiscription.textContent = apiData.discription;

const starsBlockDiv = document.createElement('div');
starsBlockDiv.className = 'main__section__wrapper__discription__stars-block';

const starsDiv = document.createElement('div');
starsDiv.className = 'main__section__block-library__wrapper__row-container__book__stars';

const starsImg = document.createElement('img');
starsImg.src = apiData.starsImg;
starsImg.alt = '';
starsImg.width = '127';
starsImg.height = '16.6';

const voiceText = document.createElement('p');
voiceText.className = 'main__section__wrapper__discription__stars-block__text';
voiceText.textContent = '(99 голосов)'

const flashSaleDiv = document.createElement('div');
flashSaleDiv.className = 'main__section__wrapper__discription__flash-sale';

const flashSaleWrapDiv = document.createElement('div');
flashSaleWrapDiv.className = 'main__section__wrapper__discription__flash-sale__wrap';

const flashSaleBlockImg = document.createElement('div');
flashSaleBlockImg.className = 'main__section__wrapper__discription__flash-sale__wrap__img';

const flashSaleImg = document.createElement('img');
flashSaleImg.src = "/img/FLA H SALE.svg"
flashSaleImg.alt = '';
flashSaleImg.width = '127';
flashSaleImg.height = '28';

const flashSaleBlockImgLightning = document.createElement('div');
flashSaleBlockImgLightning.className = 'main__section__wrapper__discription__flash-sale__wrap__img-lightning';

const flashSaleImgLightning = document.createElement('img');
flashSaleImgLightning.src = "/img/lightning.svg"
flashSaleImgLightning.alt = '';
flashSaleImgLightning.width = '20';
flashSaleImgLightning.height = '22';

const backgroundWrapTimeText = document.createElement('div');
backgroundWrapTimeText.className = 'main__section__wrapper__discription__flash-sale__wrap__backgraund';

const timeTextFirst = document.createElement('p');
timeTextFirst.className = 'main__section__wrapper__discription__flash-sale__wrap__backgraund__time-text';
timeTextFirst.textContent = '01';

const pointImg = document.createElement('img');
pointImg.className = 'main__section__wrapper__discription__flash-sale__wrap__backgraund__img';
pointImg.src = "/img/tochka.svg";
pointImg.alt = '';
pointImg.width = '8';
pointImg.height = '30';

const backgroundWrapTimeTextFirst = document.createElement('div');
backgroundWrapTimeTextFirst.className = 'main__section__wrapper__discription__flash-sale__wrap__backgraund';
backgroundWrapTimeTextFirst.appendChild(timeTextFirst);
backgroundWrapTimeTextFirst.appendChild(pointImg);

const timeTextSecond = document.createElement('p');
timeTextSecond.className = 'main__section__wrapper__discription__flash-sale__wrap__backgraund__time-text';
timeTextSecond.textContent = '21';

const pointImgSecond = document.createElement('img');
pointImgSecond.className = 'main__section__wrapper__discription__flash-sale__wrap__backgraund__img';
pointImgSecond.src = "/img/tochka.svg";
pointImgSecond.alt = '';
pointImgSecond.width = '8';
pointImgSecond.height = '30';

const backgroundWrapTimeTextSecond = document.createElement('div');
backgroundWrapTimeTextSecond.className = 'main__section__wrapper__discription__flash-sale__wrap__backgraund';
backgroundWrapTimeTextSecond.appendChild(timeTextSecond);
backgroundWrapTimeTextSecond.appendChild(pointImgSecond);

const timeTextThree = document.createElement('p');
timeTextThree.className = 'main__section__wrapper__discription__flash-sale__wrap__backgraund__time-text';
timeTextThree.textContent = '41';

const backgroundWrapTimeTextThree = document.createElement('div');
backgroundWrapTimeTextThree.className = 'main__section__wrapper__discription__flash-sale__wrap__backgraund';
backgroundWrapTimeTextThree.appendChild(timeTextThree);

const priceBlockDiv = document.createElement('div');
priceBlockDiv.className = 'main__section__wrapper__discription__price-block';

const priceItemTextNegative = document.createElement('p');
priceItemTextNegative.className = 'main__section__wrapper__discription__price-block__item-negativ';
priceItemTextNegative.textContent = `${apiData.price.earlier} $`

const priceItemText = document.createElement('p');
priceItemText.className = 'main__section__wrapper__discription__price-block__item';
priceItemText.textContent = `${apiData.price.now} $`

const priceBlockDivBackround = document.createElement('div');
priceBlockDivBackround.className = 'main__section__wrapper__discription__price-block__sale-backgr';
priceBlockDivBackround.textContent = '-30%'

const footerBlockText = document.createElement('div');
footerBlockText.className = 'main__section__wrapper__discription__footer';

const footerPublishidFirst = document.createElement('p');
footerPublishidFirst.className = 'main__section__wrapper__discription__footer__publishind';
footerPublishidFirst.textContent = 'Издательство: Pearson';

const footerPublishidSecond = document.createElement('p');
footerPublishidSecond.className = 'main__section__wrapper__discription__footer__publishind';
footerPublishidSecond.textContent = 'Год выпуска: 1989 год';



imgDiv.appendChild(img);

cartBtn.appendChild(buttonImg);

buttonBlockDiv.appendChild(cartBtn);
buttonBlockDiv.appendChild(readOnlineBtn);

starsDiv.appendChild(starsImg);

starsBlockDiv.appendChild(starsDiv);
starsBlockDiv.appendChild(voiceText);

flashSaleBlockImg.appendChild(flashSaleImg);
flashSaleBlockImgLightning.appendChild(flashSaleImgLightning);

flashSaleDiv.appendChild(backgroundWrapTimeTextFirst);
flashSaleDiv.appendChild(pointImg);
flashSaleDiv.appendChild(backgroundWrapTimeTextSecond);
flashSaleDiv.appendChild(pointImgSecond);
flashSaleDiv.appendChild(backgroundWrapTimeTextThree);

flashSaleDiv.appendChild(flashSaleWrapDiv);
flashSaleWrapDiv.appendChild(flashSaleBlockImg);
flashSaleWrapDiv.appendChild(flashSaleBlockImgLightning);

priceBlockDiv.appendChild(priceItemTextNegative);
priceBlockDiv.appendChild(priceItemText);
priceBlockDiv.appendChild(priceBlockDivBackround);

footerBlockText.appendChild(footerPublishidFirst);
footerBlockText.appendChild(footerPublishidSecond);


wrapperDiscription.appendChild(bookName);
wrapperDiscription.appendChild(bookAuthor);
wrapperDiscription.appendChild(bookGenre);
wrapperDiscription.appendChild(bookDiscription);
wrapperDiscription.appendChild(starsBlockDiv);
wrapperDiscription.appendChild(flashSaleDiv);
wrapperDiscription.appendChild(priceBlockDiv);
wrapperDiscription.appendChild(footerBlockText);

bookDivContainer.appendChild(imgDiv);
bookDivContainer.appendChild(buttonBlockDiv);

booksContainer.appendChild(bookDivContainer);
booksContainer.appendChild(wrapperDiscription);

}


