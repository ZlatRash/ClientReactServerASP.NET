import { Category } from "../category/Category";

export type Product = {
    id: number;
    name: string;
    price: number;
    categoryId: number;
    category: Category;
}