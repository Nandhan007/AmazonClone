import {cart, removeProduct,cartQuantity, UpdateDeliveryOptions} from '../../data/cart.js'
import { getProduct, products } from '../../data/products.js'
// ESM Version of dayjs library
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { DeliveryOptions , getDeliverySummary} from '../../data/delivery.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary(){
let productHTML = "";
let matchedProduct;
cart.forEach((item)=>{
    const productId = item.prodId;
    matchedProduct=getProduct(productId);
   const DeliveryOptionid = item.Deliveryid;
   let DeliveryOption = getDeliverySummary(DeliveryOptionid);
   const today = dayjs();
   const DeliveryDate = today.add(DeliveryOption.DeliveryDays,"days");
   const DateFormat = DeliveryDate.format("dddd, MMMM D");
    if(matchedProduct){
    productHTML +=`
            <div class="cart-item-container js-delete-container-${matchedProduct.id}">
            <div class="delivery-date">
              Delivery Date: ${DateFormat}
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
                ${Delivery(matchedProduct, item)}
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
        renderPaymentSummary();
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

const saveLinks = document.querySelectorAll('.save-quantity-link');
saveLinks.forEach((savelink)=>{
    savelink.addEventListener('click',()=>{
        const saveId=savelink.dataset.productId;
        const Product_Container = document.querySelector(`.js-delete-container-${saveId}`);
        Product_Container.classList.remove('is-editing-update');
        let matchProduct;
        cart.forEach((item)=>{
            if(saveId === item.prodId){
                matchProduct = item;
            }
        })
        inputValueUpdate(matchProduct,Product_Container)
        Product_Container.querySelector('.quantity-label').innerHTML = matchProduct.quantity;
        checkoutQuantity.innerHTML = cartQuantity();
        renderPaymentSummary();
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
function Delivery(matchedProduct,item){
let htmlStructure = '';
DeliveryOptions.forEach((Deliveryoption)=>{
    let isChecked = (Deliveryoption.id === item.Deliveryid);
    const today = dayjs();
    const deliveryDate = today.add(Deliveryoption.DeliveryDays,"days");
    const DateFormat = deliveryDate.format("dddd, MMMM D")
    const PriceString = Deliveryoption.DeliveryPrice == 0 ? 'FREE' : `$${(Deliveryoption.DeliveryPrice/100).toFixed(2)} -`;


    htmlStructure+=`<div class="delivery-option js-delivery-options"
                      data-product-id=${matchedProduct.id}
                      data-delivery-id=${Deliveryoption.id}>
                  <input type="radio" ${isChecked ? 'checked':''}
                    class="delivery-option-input"
                    name="delivery-option-${matchedProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${DateFormat}
                    </div>
                    <div class="delivery-option-price">
                      ${PriceString} Shipping
                    </div>
                  </div>
                </div>
  `
    
})
return htmlStructure;
}

document.querySelectorAll('.js-delivery-options').forEach((element)=>{
  element.addEventListener('click',()=>{
    const productid = element.dataset.productId;
    const Deliveryid = element.dataset.deliveryId;
    UpdateDeliveryOptions(productid, Deliveryid)
    renderOrderSummary();
    renderPaymentSummary();
  })
})

}

renderOrderSummary();