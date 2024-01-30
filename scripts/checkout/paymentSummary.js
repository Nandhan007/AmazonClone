import { cart ,cartQuantity} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliverySummary } from "../../data/delivery.js"; 
import { formatcurrency } from "../utils/money.js";

export function renderPaymentSummary(){
    let productAmount = 0;
    let shippingAmount = 0;
   cart.forEach((cartItem)=> {
        const product = getProduct(cartItem.prodId);
        productAmount += product.priceCents * cartItem.quantity;

        const Deliveryoption= getDeliverySummary(cartItem.Deliveryid);
        shippingAmount+=Deliveryoption.DeliveryPrice;
   });
    const totalBeforeTax = productAmount+shippingAmount;
    const Taxcents =  totalBeforeTax*0.1;
    const totalAmount = totalBeforeTax + Taxcents;

    const productHTML = `<div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (${cartQuantity()}):</div>
    <div class="payment-summary-money">$${formatcurrency(productAmount)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatcurrency(shippingAmount)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatcurrency(totalBeforeTax)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatcurrency(Taxcents)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatcurrency(totalAmount)}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>`

  document.querySelector('.payment-summary').innerHTML = productHTML;
}