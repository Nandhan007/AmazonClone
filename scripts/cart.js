export let cart=[  {
        prodId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 5
    },{
         prodId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
         quantity: 10
     }];

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