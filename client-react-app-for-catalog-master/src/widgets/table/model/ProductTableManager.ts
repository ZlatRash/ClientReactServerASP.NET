import TableManager from "./TableManager";
import IdUtils from "../../../shared/utils/IdUtils";
import {productStore} from "../../../app/store/ProductStore";
import ProductService from "../../../entity/product/service/ProductService";
import {categoryStore} from "../../../app/store/CategoryStore";
import { Product } from "../../../entity/product/Product";


export default class ProductTableManager extends TableManager {

    public add(): void {
        if (productStore.creatableProduct.price <= 0 || productStore.creatableProduct.name.length === 0) return;
        const product: Product = {
            id: IdUtils.makeOriginalId(productStore.products),
            name: productStore.creatableProduct.name,
            price: productStore.creatableProduct.price,
            category: productStore.creatableProduct.category,
            categoryId: productStore.creatableProduct.categoryId,
        };
        if (!categoryStore.lastLinkedCategory) {
            alert("Пожалуйста выберете категорию");
            return;
        }
        if (categoryStore.lastLinkedCategory) {
            productStore.creatableProduct = {
                id: -1,
                name: "",
                category: categoryStore.lastLinkedCategory,
                price: 0,
                categoryId:categoryStore.lastLinkedCategory.id
            };
        }
        productStore.addProduct(product);
        ProductService.addProduct(product)
            .catch(err => console.error(err));
    }

    public deleteById(id: number) {
        productStore.products = IdUtils.getArrayFilteredById(id, productStore.products);
        ProductService.deleteProductById(id);
    }

    public editById(id: number) {
        let _editableProduct = IdUtils.getItemById(id, productStore.products);
        if (!_editableProduct) return;
        productStore.editableProduct = _editableProduct;
    }

    public saveEditing() {
        let oldProducts = productStore.products;
        if (productStore.editableProduct === null) return;
        const idOfEditableProduct = productStore.editableProduct.id;
        const indexOfProducts = productStore.products.findIndex((product) => product.id === idOfEditableProduct);
        const editableProduct = productStore.editableProduct;
        oldProducts.splice(indexOfProducts, 1, editableProduct);
        productStore.products = oldProducts;
        ProductService.editProductById(editableProduct.id, editableProduct);
        productStore.editableProduct = null;
    }
}