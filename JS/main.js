const btnBtnPrimary = document.querySelectorAll(".addCelu");
btnBtnPrimary.forEach(btnBtnPrimary => {
    btnBtnPrimary.addEventListener('click', addCeluClick);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
    '.shoppingCartItemsContainer');

function addCeluClick(event) {
    const button = event.target;
    const item = button.closest('.item');
    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const cardImgTop = item.querySelector('.card-img-top').src; 
    addCeluShopping(itemTitle, itemPrice, cardImgTop);
}

function addCeluShopping(itemTitle, itemPrice, cardImgTop) {
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
        'shoppingCartItemTitle');
      for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitle) {
     let elementQuantity = elementsTitle[i].parentElement
                                           .parentElement
                                           .parentElement
                                           .querySelector('.shoppingCartItemQuantity');
          elementQuantity.value++;
          $('.toast').toast('show');
          updateShoppingCartTotal();
          return;
     }
}

   const shoppingCartRow = document.createElement('div');
   const shoppingCartContent =  `
   <div class="row shoppingCartItem">
     <div class="col-6">
        <div class="shopping-cart-item">
            <img src=${cardImgTop} class="shopping-cart-image" style="width: 10rem;">
            <h6 class="shopping-cart-item-title shoppingCartItemTitle">${itemTitle}</h6>
        </div>
     </div>
         <div class="col-2">
             <div class="shopping-cart-price">
                 <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
             </div>
         </div>
     <div class="col-4">
        <div
         class="shopping-cart-quantity">
            <input class="shopping-cart-quantity-input shoppingCartItemQuantity"
             type="number" value="1">
        <button class="btn btn-danger buttonDelete" type="button">X</button>
        </div>
     </div>
   </div>`;
   shoppingCartRow.innerHTML = shoppingCartContent;
   shoppingCartItemsContainer.append(shoppingCartRow);

   shoppingCartRow
   .querySelector('.buttonDelete')
   .addEventListener('click', removeShoppingCartItem);

 shoppingCartRow
   .querySelector('.shoppingCartItemQuantity')
   .addEventListener('change', quantityChanged);

   updateShoppingCartTotal()
}

function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

    const shoppingCartItem = document.querySelectorAll('.shoppingCartItem');
    
    shoppingCartItem.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
        '.shoppingCartItemPrice');
    const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace
        ('$',' '));
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
        '.shoppingCartItemQuantity');
    const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);     
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
 });
 shoppingCartTotal.innerHTML = `${total}$`;
}

function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
  }
  
  function quantityChanged(event) {
    const input = event.target;
     if (input.value <= 0) {input.value = 1;}
    updateShoppingCartTotal();
  }
  
  function comprarButtonClicked() {
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
  }
