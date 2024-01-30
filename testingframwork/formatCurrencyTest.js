import { formatcurrency } from "../scripts/utils/money.js";

describe("Test Suite: format Currency",()=>{
    it("Test case for decimal numbers",()=>{
        expect(formatcurrency(2000.5)).toEqual('20.01')
    })

    it('Test case for zero',()=>{
        expect(formatcurrency(0)).toEqual('0.00');
    })
});