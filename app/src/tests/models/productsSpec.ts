import products from "../../models/products";

describe("test products model",()=>{
    
    it("test : create method defiend",()=>{
        expect(products.create).toBeDefined();
    })

    it("test : index method defiend",()=>{
        expect(products.index).toBeDefined();
    })

    it("test : update method defiend",()=>{
        expect(products.update).toBeDefined();
    })

    it("test : show method defiend",()=>{
        expect(products.show).toBeDefined();
    })

    it("test : delete method defiend",()=>{
        expect(products.delete).toBeDefined();
    })


});