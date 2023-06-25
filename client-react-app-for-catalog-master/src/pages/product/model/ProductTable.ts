import ProductService from "../../../entity/product/service/ProductService";
import {productStore} from "../../../app/store/ProductStore";

export function fetchProducts() {
    ProductService.fetchProducts()
        .then(res => productStore.products = res.data)
        .catch(err => console.error(err));
}
