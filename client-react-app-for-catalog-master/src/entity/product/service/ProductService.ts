import {AxiosResponse} from "axios";
import $api from "../../../app/constant/GlobalConstants";
import {Product} from "../Product";

export default class ProductService {
    static async fetchProducts(): Promise<AxiosResponse<Product[]>> {
        return $api.get<Product[]>("/Product");
    }

    static async addProduct(product: Product): Promise<AxiosResponse<Product>> {
        return $api.put<Product>("/Product", {
            id: product.id,
            name: product.name,
            price: product.price,
            categoryId: product.categoryId
        });
    }

    static async editProductById(id: number, product: Product): Promise<AxiosResponse<Product>> {
        return $api.post<Product>(`/Product/${id}`, product);
    }

    static async fetchProductById(id: number): Promise<AxiosResponse<Product>> {
        return $api.post<Product>(`/Product/${id}`);
    }

    static async deleteProductById(id: number): Promise<AxiosResponse<Product>> {
        return $api.delete<Product>(`/Product/${id}`);
    }
}