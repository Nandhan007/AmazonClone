import {cart, removeProduct,cartQuantity } from './cart.js'
import { products } from '../data/products.js'
let productHTML = "";
let matchedProduct;
cart.forEach((item)=>{
    const productId = item.prodId;
    products.forEach((product)=>{
        if(product.id == productId){
            matchedProduct = product;
        }
    })
    if(matchedProduct){
    productHTML +=`
            <div class="cart-item-container js-delete-container-${matchedProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchedProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchedProduct.name}
                </div>
                <div class="product-price">
                  $${(matchedProduct.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary" data-product-id=${matchedProduct.id}>
                    Update
                  </span>
                  <input class="quantity-input" id="quantity-input">
                  <span class="save-quantity-link link-primary" data-product-id=${matchedProduct.id}>Save</span>
                  <span class="delete-quantity-link link-primary js-delete-product" data-product-id="${matchedProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchedProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchedProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchedProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            `
    }
})
document.querySelector(".order-summary").innerHTML = productHTML;

const deleteprod = document.querySelectorAll(".js-delete-product");

deleteprod.forEach((item)=>{
    item.addEventListener('click',()=>{
        const productId = item.dataset.productId;
        removeProduct(productId);

        const container = document.querySelector(`.js-delete-container-${productId}`);
        container.remove();

        checkoutQuantity.innerHTML = cartQuantity();
    })
})


const checkoutQuantity = document.querySelector('.cart-quantity-checkout');
checkoutQuantity.innerHTML = cartQuantity();

const updateLink = document.querySelectorAll('.update-quantity-link');
updateLink.forEach((update)=>{
    update.addEventListener('click',()=>{
        const updateid=update.dataset.productId;
        const Product_Container = document.querySelector(`.js-delete-container-${updateid}`);
        Product_Container.classList.add('is-editing-update');
    })
})
let matchProduct;
const saveLinks = document.querySelectorAll('.save-quantity-link');
saveLinks.forEach((savelink)=>{
    savelink.addEventListener('click',()=>{
        const saveId=savelink.dataset.productId;
        const Product_Container = document.querySelector(`.js-delete-container-${saveId}`);
        Product_Container.classList.remove('is-editing-update');
        
        cart.forEach((cartitem)=>{
            if(cartitem.prodId === saveId){
                matchProduct = cartitem;
            }
        })
        inputValueUpdate(matchProduct,Product_Container)
        Product_Container.querySelector('.quantity-label').innerHTML = matchProduct.quantity;
        checkoutQuantity.innerHTML = cartQuantity();
        
    })
})


function inputValueUpdate(product,Product_Container){
        const inputval = Product_Container.querySelector('.quantity-input');
        product.quantity = Number(inputval.value);
        if(Number(inputval.value)<=0 || Number(inputval.value)>1000){
        alert("Input is not valid and ranges between 0 to 1000");
        return;
        }
        inputval.value = "";
       localStorage.setItem('cart',JSON.stringify(cart));
}