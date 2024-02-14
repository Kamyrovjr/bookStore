document.addEventListener('DOMContentLoaded', () => {

axios.get(`https://65bc9541b51f9b29e931ca00.mockapi.io/cart`)
  .then(response => {
    if (response.data && response.data.length > 0) {
      const books = response.data;
      addBookCartFromApi(books);
    } else {
      console.error('Данные отсутствуют в ответе API или массив данных пуст');
    }
  })
  .catch(error => console.error('Ошибка при получении данных из API:', error));

  function addBookCartFromApi(books) {
    const blockWrapperDiv = document.querySelector('.main__section__block-cart__wrapper');
    const paymentDiv = document.querySelector('.main__section__block-cart__wrapper__promocode-container__payment');
    const checkboxLabel = document.querySelector('.main__section__block-cart__wrapper__product-checkbox__label')
  
  
    let totalPrice = 0;
    let totalPricePay = 0
    let discount = 0
    let spanNumberText = 1;
  
    books.forEach((book, index) => {
      const productContainer = document.createElement('div')
      productContainer.className = 'main__section__block-cart__wrapper__product-container'
  
      const productCheckboxLabel2 = document.createElement('label');
      const productCheckboxInput2 = document.createElement('input');
      productCheckboxInput2.className = 'main__section__block-cart__wrapper__product-container__input';
      productCheckboxInput2.type = 'checkbox';
      productCheckboxInput2.id = `productCheckbox${book.id}`;
  
      const productImg = document.createElement('img');
      productImg.className = 'main__section__block-cart__wrapper__product-container__product-img';
      productImg.src = book.avatar;
      productImg.alt = '';
      productImg.width = '80';
      productImg.height = '118';
  
      const productInfoText = document.createElement('div');
      productInfoText.className = 'main__section__block-cart__wrapper__product-container__info__text';
  
      const productName = document.createElement('span');
      productName.className = 'main__section__block-cart__wrapper__product-container__info__text__name';
      productName.textContent = book.name;
  
      const productPrice = document.createElement('span');
      productPrice.className = 'main__section__block-cart__wrapper__product-container__info__text__price';
      productPrice.textContent =  `Цена: ${book.price} $`;
  
      const productInfo = document.createElement('div');
      productInfo.className = 'main__section__block-cart__wrapper__product-container__info';
  
      const quantityDiv = document.createElement('div');
      quantityDiv.className = 'main__section__block-cart__wrapper__product-container__info__quantity';
  
      const minusBtn = document.createElement('button');
      minusBtn.className = 'main__section__block-cart__wrapper__product-container__info__bnt';
  
      const minusBtnImg = document.createElement('img');
      minusBtnImg.className = 'main__section__block-cart__wrapper__product-container__info__bnt__img';
      minusBtnImg.src = '/page/img cart-page/-.svg';
      minusBtnImg.alt = '';
      minusBtnImg.width = '9';
      minusBtnImg.height = '5';
  
      const quantityNumber = document.createElement('span');
      quantityNumber.className = 'main__section__block-cart__wrapper__product-container__info__quantity__number';
      quantityNumber.id = 'productQuantity';
      quantityNumber.textContent = spanNumberText;
  
      const plusBtn = document.createElement('button');
      plusBtn.className = 'main__section__block-cart__wrapper__product-container__info__bnt';
  
      const plusBtnImg = document.createElement('img');
      plusBtnImg.className = 'main__section__block-cart__wrapper__product-container__info__bnt__img';
      plusBtnImg.src = '/page/img cart-page/+.svg';
      plusBtnImg.alt = '';
      plusBtnImg.width = '12';
      plusBtnImg.height = '11';
  
      const totalSpan = document.createElement('span'); 
      totalSpan.className = 'main__section__block-cart__wrapper__product-container__info__total-price';
      const totalPriceForBook = calculateTotalPrice(book.price, spanNumberText);
      totalSpan.textContent = `$${totalPriceForBook.toFixed(1)}`;
  
      totalPrice += totalPriceForBook;
      discount = totalPrice * 0.3
      totalPricePay = totalPrice - discount
  
  
      const deleteDiv = document.createElement('div');
      deleteDiv.className = 'main__section__block-cart__wrapper__product-container__delete';
  
      const deleteImg = document.createElement('img');
      deleteImg.src = '/page/img cart-page/delete.svg';
      deleteImg.alt = '';
      deleteImg.width = '22';
      deleteImg.height = '25';
  
      deleteDiv.addEventListener('click', () => {
        axios.delete(`https://65bc9541b51f9b29e931ca00.mockapi.io/cart/${book.id}`)
          .then(response => {
            console.log('Книга успешно удалена из корзины:', response.data)
            const productContainer = deleteImg.closest('.main__section__block-cart__wrapper__product-container');
            if (productContainer) {
              productContainer.remove();
              updateLog(blockWrapperDiv.children.length);
            }
          })
          .catch(error => {
              console.error('Ошибка при добавлении книги в корзину:', error);
          });
      })
  
      productCheckboxLabel2.appendChild(productCheckboxInput2);
      productInfoText.appendChild(productName);
      productInfoText.appendChild(productPrice);
  
      productContainer.appendChild(productCheckboxLabel2);
      productContainer.appendChild(productImg);
      productContainer.appendChild(productInfoText);
      productContainer.appendChild(productInfo);
  
      minusBtn.appendChild(minusBtnImg);
      plusBtn.appendChild(plusBtnImg);
      quantityDiv.appendChild(minusBtn);
      quantityDiv.appendChild(quantityNumber);
      quantityDiv.appendChild(plusBtn);
      productInfo.appendChild(quantityDiv);
      productInfo.appendChild(totalSpan);
      deleteDiv.appendChild(deleteImg);
      productInfo.appendChild(deleteDiv);
  
      blockWrapperDiv.appendChild(productContainer);
  
      plusBtn.addEventListener('click', function() {
        changeQuantity('plus', quantityNumber, totalSpan, book.price);
        updateLog(blockWrapperDiv.children.length); 
      });
  
      minusBtn.addEventListener('click', function() {
        changeQuantity('minus', quantityNumber, totalSpan, book.price);
        updateLog(blockWrapperDiv.children.length);
      });
  
      if (index === books.length - 1) {
        setTimeout(() => {
          updateLog(books.length);
        }, 500); 
      }
    });
  
    const item1 = document.createElement('div');
    item1.className = 'main__section__block-cart__wrapper__promocode-container__payment__item';
    const title1 = document.createElement('div');
    title1.className = 'main__section__block-cart__wrapper__promocode-container__payment__item__title';
    title1.textContent = `${books.length} товар(а)`;
    const value1 = document.createElement('div');
    value1.className = 'main__section__block-cart__wrapper__promocode-container__payment__item__value';
    value1.textContent = `${totalPrice.toFixed(1)} $`;
    item1.appendChild(title1);
    item1.appendChild(value1);
  
    paymentDiv.insertBefore(item1, paymentDiv.firstChild);
  
    const item2 = createPaymentItem('Скидка', `${discount.toFixed(1)} $`);
    item2.style.color = 'red'
    const item3 = createPaymentItem('Итого', `${totalPricePay.toFixed(1)} $`);
  
    paymentDiv.appendChild(item2);
    paymentDiv.appendChild(item3);
  
    const quantityOfGoods = document.createElement('main__section__block-cart__wrapper__product-checkbox__quantity-of-goods')
    quantityOfGoods.textContent = `(${books.length} товара)`
    quantityOfGoods.id = 'blockId'
    checkboxLabel.appendChild(quantityOfGoods)
  }
  
  function updateLog(newContent) {
    const block = document.getElementById("blockId");
    if (block) {
      block.textContent = `(${newContent} товара)`;
    } else {
      console.error(`Блок с идентификатором blockId не найден.`);
    }
  }
  
  function createPaymentItem(title, value) {
    const item = document.createElement('div');
    item.className = 'main__section__block-cart__wrapper__promocode-container__payment__item';
    const titleElem = document.createElement('div');
    titleElem.className = 'main__section__block-cart__wrapper__promocode-container__payment__item__title';
    titleElem.textContent = title;
    const valueElem = document.createElement('div');
    valueElem.className = 'main__section__block-cart__wrapper__promocode-container__payment__item__value';
    valueElem.textContent = value;
    item.appendChild(titleElem);
    item.appendChild(valueElem);
    return item;
  }
  
  function changeQuantity(action, quantityElement, totalSpan, pricePerItem) {
    let currentQuantity = parseInt(quantityElement.textContent);
  
    if (action === 'plus') {
      currentQuantity++;
    } else if (action === 'minus' && currentQuantity > 1) {
      currentQuantity--;
    }
  
    quantityElement.textContent = currentQuantity;
    totalSpan.textContent = `$${calculateTotalPrice(pricePerItem, currentQuantity).toFixed(1)}`;
  }
  
  function calculateTotalPrice(pricePerItem, quantity) {
    return pricePerItem * quantity;
  }
})

