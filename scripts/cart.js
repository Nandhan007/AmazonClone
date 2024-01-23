export let cart=[];

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
  
  }