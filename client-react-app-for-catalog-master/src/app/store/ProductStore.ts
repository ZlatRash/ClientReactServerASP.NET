import {makeAutoObservable} from "mobx";
import { CategoryType } from "../../entity/category/Category";
import { Product } from "../../entity/product/Product";

class ProductStore {

    private _products: Product[] = [];
    private _editableProduct: Product | null = null;
    private _creatableProduct: Product = {
        id: -1,
        name: "",
        category: {id: -1, name: "", type: CategoryType.OTHERS_PRODUCTS},
        price: 0,
        categoryId:1
    };

    constructor() {
        makeAutoObservable(this);
    }


    get products(): Product[] {
        return this._products;
    }

    set products(value: Product[]) {
        this._products = value;
    }

    public addProduct(product: Product) {
        this._products.push(product);
    }

    get editableProduct(): Product | null {
        return this._editableProduct;
    }

    set editableProduct(value: Product | null) {
        this._editableProduct = value;
    }

    get creatableProduct(): Product {
        return this._creatableProduct;
    }

    set creatableProduct(value: Product) {
        this._creatableProduct = value;
    }
}

export const productStore = new ProductStore();
