export let cart=JSON.parse(localStorage.getItem('cart'));


if(!cart || !Array.isArray(cart)){
    cart = [];
}

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function add_Cart(ProductId){
    let matchedProduct;
    const selector = document.querySelector(`.js-quantity-selector-${ProductId}`);
    let Quantity = Number(selector.value);
  
    cart.forEach((product)=>{
      if(product.prodId === ProductId){
          matchedProduct = product;
      }
  })
  if(matchedProduct){
      matchedProduct.quantity += Quantity;
  }
  else{
      cart.push({
          prodId: ProductId,
          quantity: Quantity
         })
  }
  
  saveToStorage();
  }

export function removeProduct(ProductId){
    let newcart = []
    cart.forEach((product)=>{
        if(product.prodId !== ProductId){
            newcart.push(product);
        }
    })
    cart = newcart;

    saveToStorage();
  }

export function cartQuantity(){
    let count=0;
    cart.forEach((item)=>{
        count+=item.quantity;
    })
    return count;
}