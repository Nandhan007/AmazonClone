export let cart;

localFromStorage();
export function localFromStorage(){
cart=JSON.parse(localStorage.getItem('cart'));
if(!cart || !Array.isArray(cart)){
    cart = [{
        prodId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        Deliveryid: '1'
    }];
}
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
          quantity: Quantity,
          Deliveryid: '1'
         })
  }
  
  saveToStorage();
}

export function addtoCart(productId){
    let matchedProduct;
  
    cart.forEach((product)=>{
      if(product.prodId === productId){
          matchedProduct = product;
      }
  })
  if(matchedProduct){
      matchedProduct.quantity += 1;
  }
  else{
      cart.push({
          prodId: productId,
          quantity: 1,
          Deliveryid: '1'
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

export function UpdateDeliveryOptions(productid,Deliveryid){
    let Deliveryproduct;
    cart.forEach((item)=>{
        if(productid === item.prodId){
            Deliveryproduct = item;
        }
    })
    Deliveryproduct.Deliveryid = Deliveryid;
    localStorage.setItem('cart',JSON.stringify(cart));
}