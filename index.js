document.addEventListener('DOMContentLoaded', function() {
  axios.get('https://65bc9541b51f9b29e931ca00.mockapi.io/book/book')
    .then(response => {
      const apiData = response.data;
      addBooksFromApi(apiData);
      
      const searchInput = document.getElementById('inputSearch');
      const searchIcon = document.querySelector('.main__header__wrapper__search__border__img');

      searchIcon.addEventListener('click', () => {
        const nameQuery = searchInput.value.trim();
        filterBooksBySearchQuery(apiData, nameQuery);
      });

      searchInput.addEventListener('input', () => {
        const nameQuery = searchInput.value.trim();
        filterBooksBySearchQuery(apiData, nameQuery);
      });

      const filterBtnD = document.querySelector('.main__section__block-library__wrapper__btn');
        filterBtnD.addEventListener('click', () => {
          filterBooks(
            apiData,
            document.getElementById('genre'),
            document.getElementById('language'),
            document.getElementById('format'),
            document.getElementById('publishing')
          );
          
        });
        updateFilters(apiData);
    })
    .catch(error => console.error('Ошибка при получении данных из API:', error));

    function addBooksFromApi(apiData) {
    const booksContainer = document.querySelector('.main__section__block-library__wrapper');
    const bookDivContainer = document.createElement('div');
    bookDivContainer.className = 'main__section__block-library__wrapper__row-container';

   
    apiData.forEach(book => {
      const bookDiv = document.createElement('div');
      bookDiv.className = 'main__section__block-library__wrapper__row-container__book';
      bookDiv.dataset.genre = book.genre;
      bookDiv.dataset.language = book.language;
      bookDiv.dataset.format = book.format;
      bookDiv.dataset.publishing = book.publishing;
      bookDiv.dataset.dataid = book.id;

      const imgDiv = document.createElement('div');
      imgDiv.className = 'main__section__block-library__wrapper__row-container__book__img-all-books';

      const img = document.createElement('img');
      img.src = book.avatar; 
      img.alt = '';
      img.width = '217';
      img.height = '303';

      const starsDiv = document.createElement('div');
      starsDiv.className = 'main__section__block-library__wrapper__row-container__book__stars';

      const starsImg = document.createElement('img');
      starsImg.src = book.starsImg;
      starsImg.alt = '';
      starsImg.width = '127';
      starsImg.height = '16.6';

      const bookLinkText = document.createElement('a');
      bookLinkText.href = `/page/page-book.html?id=${book.id}`;
      bookLinkText.className = 'main__section__block-library__wrapper__row-container__book__text';
      bookLinkText.textContent = book.name;

      const priceDiv = document.createElement('div');
      priceDiv.className = 'main__section__block-library__wrapper__row-container__book__price';

      const priceNowP = document.createElement('p');
      priceNowP.className = 'main__section__block-library__wrapper__row-container__book__price__now';
      priceNowP.textContent = `${book.price.now} $`;

      const priceEarlierP = document.createElement('p');
      priceEarlierP.className = 'main__section__block-library__wrapper__row-container__book__price__earlier';
      priceEarlierP.textContent = `${book.price.earlier} $`;

      const buttonsDiv = document.createElement('div');
      buttonsDiv.className = 'main__section__block-library__wrapper__row-container__book__buttons';

      const bookLink = document.createElement('a');
      bookLink.href = `/page/page-book.html?id=${book.id}`;

      const readOnlineBtn = document.createElement('button');
      readOnlineBtn.className = 'main__section__block-library__wrapper__row-container__book__buttons__read-online';
      readOnlineBtn.textContent = 'Читать онлайн';

      const cartDiv = document.createElement('div');
      cartDiv.className = 'main__section__block-library__wrapper__row-container__book__buttons__cart';

      const cartImg = document.createElement('img');
      cartImg.className = 'main__section__block-library__wrapper__row-container__book__buttons__cart__img'
      cartImg.src = book.cartImg;
      cartImg.alt = '';
      cartImg.width = '35';
      cartImg.height = '45';

      cartImg.addEventListener('click', function() {
        const bookId = book.id; 
        const bookName = book.name;
        const bookPrice = book.price.now;
        const bookImg = book.avatar

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

      imgDiv.appendChild(img);
      starsDiv.appendChild(starsImg);
      priceDiv.appendChild(priceNowP);
      priceDiv.appendChild(priceEarlierP);
      bookLink.appendChild(readOnlineBtn);
      cartDiv.appendChild(cartImg);

      bookDiv.appendChild(imgDiv);
      bookDiv.appendChild(starsDiv);
      bookDiv.appendChild(bookLinkText);
      bookDiv.appendChild(priceDiv);
      bookDiv.appendChild(buttonsDiv);
      buttonsDiv.appendChild(bookLink);
      buttonsDiv.appendChild(cartDiv);

      bookDivContainer.appendChild(bookDiv);
    });

    booksContainer.appendChild(bookDivContainer);
  }
  function searchBooksByName(books, nameQuery) {
    const lowerCaseQuery = nameQuery.toLowerCase().trim();
    return books.filter(book => {
      const lowerCaseName = book.name.toLowerCase();
      return lowerCaseName.includes(lowerCaseQuery);
    });
  }
  
  function filterBooksBySearchQuery(books, nameQuery) {
    const matchedBooks = searchBooksByName(books, nameQuery);
    const bookElements = document.querySelectorAll('.main__section__block-library__wrapper__row-container__book');
  
    if (matchedBooks.length > 0) {
      hideBooksExceptMatched(bookElements, matchedBooks);
    } else {
      hideBooks(bookElements);
      showNoBooksFoundMessage(); 
    }
  }

  function hideBooks(bookElements) {
    bookElements.forEach(bookElement => {
      bookElement.style.display = 'none';
    });
  }

  function hideBooksExceptMatched(bookElements, matchedBooks) {
    bookElements.forEach(bookElement => {
      const bookId = bookElement.dataset.dataid;
      if (!matchedBooks.some(book => book.id === bookId)) {
        bookElement.style.display = 'none';
      } else {
        bookElement.style.display = 'block';
      }
    });
  }

  function showNoBooksFoundMessage() {
    const noBooksFoundMessage = document.createElement('p');
    noBooksFoundMessage.textContent = 'No books found.';
  }

  function updateFilters(books) {
    const genresSelect = document.getElementById('genre');
    const languagesSelect = document.getElementById('language');
    const formatsSelect = document.getElementById('format');
    const publishersSelect = document.getElementById('publishing');
  
    const publishers = [...new Set(books.map(book => book.publishing))];
    const genres = [...new Set(books.map(book => book.genre))];
    const languages = [...new Set(books.map(book => book.language))];
    const formats = [...new Set(books.map(book => book.format))];
  
    publishers.forEach(publishing => {
      const option = document.createElement('option');
      option.value = publishing;
      option.textContent = publishing;
      publishersSelect.appendChild(option);
    });
    
    formats.forEach(format => {
      const option = document.createElement('option');
      option.value = format;
      option.textContent = format;
      formatsSelect.appendChild(option);
    });
  
    genres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre;
      option.textContent = genre;
      genresSelect.appendChild(option);
    });
  
    languages.forEach(language => {
      const option = document.createElement('option');
      option.value = language;
      option.textContent = language;
      languagesSelect.appendChild(option);
    });
  }
  
  function filterBooks(books, genresSelect, languagesSelect, formatsSelect, publishersSelect) {
    const selectedGenre = genresSelect.value;
    const selectedLanguage = languagesSelect.value;
    const selectedFormat = formatsSelect.value;
    const selectedPublisher = publishersSelect.value;
  
    const bookElements = document.querySelectorAll('.main__section__block-library__wrapper__row-container__book');
  
    bookElements.forEach(bookElement => {
      const bookGenre = bookElement.dataset.genre;
      const bookLanguage = bookElement.dataset.language;
      const bookFormat = bookElement.dataset.format;
      const bookPublisher = bookElement.dataset.publishing;
  
      const shouldShowBook = (
        (selectedGenre === 'All' || selectedGenre === bookGenre) &&
        (selectedLanguage === 'All' || selectedLanguage === bookLanguage) &&
        (selectedFormat === 'All' || selectedFormat === bookFormat) &&
        (selectedPublisher === 'All' || selectedPublisher === bookPublisher)
      );
  
      if (!shouldShowBook) {
        bookElement.style.display = 'none';
      } else {
        bookElement.style.display = 'flex';
        bookElement.style.justifyContent = 'start';
      }
    });
  }
});

