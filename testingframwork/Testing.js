import { formatcurrency } from "../scripts/utils/money.js";
import { addtoCart ,cart, localFromStorage} from "../data/cart.js";

describe("Test Suite: format Currency",()=>{
    it("Test case for decimal numbers",()=>{
        expect(formatcurrency(2000.5)).toEqual('20.01')
    })

    it('Test case for zero',()=>{
        expect(formatcurrency(0)).toEqual('0.00');
    })
});

describe("Test suite: Add to cart",()=>{
    // Mock up runs only once
    it("Add the product to the new cart",()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        console.log(localStorage.getItem('cart'));
        localFromStorage();
        addtoCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].prodId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart[0].quantity).toEqual(1);
    })
    it("Adding existing product to the cart",()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                prodId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                Deliveryid: '1'
            }]);
        });
        addtoCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].prodId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart[0].quantity).toEqual(2);
    })
})
