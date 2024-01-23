import {cart, add_Cart} from './cart.js'
import { products } from '../data/products.js';
let productHTML = '';


products.forEach((product)=>{
    const HTML = `<div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars*10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      ${(product.priceCents/100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart" id="added-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary" data-product-name="${product.name}" data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>`

  productHTML=productHTML+HTML;
 
});

document.querySelector(".products-grid").innerHTML = productHTML;



const addToCart = document.querySelectorAll('.add-to-cart-button');
console.log(addToCart);
addToCart.forEach((button)=>{
    button.addEventListener('click',()=>{
      const ProductId= button.dataset.productId;
        add_Cart(ProductId);
        addCount();
       labelAdded(button);
    })
})

function addCount(){
        let count=0;
        const cartQuantity = document.querySelector('.cart-quantity');
        cart.forEach((item)=>{
        count+=item.quantity;
        })
        cartQuantity.innerHTML = count;

}

function labelAdded(button){
  const productCont = button.closest('.product-container');
  const visibleMsg = productCont.querySelector('.added-to-cart');
  visibleMsg.style.opacity = 1;
  
  setTimeout(function(){
      visibleMsg.style.opacity = 0;
      visibleMsg.style.transitionTimingFunction = "ease-out";
      visibleMsg.style.transitionDelay = '0.15s'
      visibleMsg.style.transitionDuration = '0.15s'
  },1000);
}