"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = __importDefault(require("../../models/products"));
describe("test products model", () => {
    it("test : create method defiend", () => {
        expect(products_1.default.create).toBeDefined();
    });
    it("test : index method defiend", () => {
        expect(products_1.default.index).toBeDefined();
    });
    it("test : update method defiend", () => {
        expect(products_1.default.update).toBeDefined();
    });
    it("test : show method defiend", () => {
        expect(products_1.default.show).toBeDefined();
    });
    it("test : delete method defiend", () => {
        expect(products_1.default.delete).toBeDefined();
    });
});
