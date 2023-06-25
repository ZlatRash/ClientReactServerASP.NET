import {categoryStore} from "../../../app/store/CategoryStore";
import {productStore} from "../../../app/store/ProductStore";
import { Category } from "../../../entity/category/Category";

export function setCategoryToProduct(categoryName: string): void {
    const category = getCategoryParamsByCategoryName(categoryName);
    categoryStore.lastLinkedCategory = category;
    if (category === null) return;
    if (productStore.editableProduct) {
        productStore.editableProduct.categoryId = category.id
        productStore.editableProduct.category = category;
    } else {
        productStore.creatableProduct.categoryId = category.id
        productStore.creatableProduct.category = category;
    }
}

function getCategoryParamsByCategoryName(categoryName: string): Category | null {
    const categoriesMap = categoryStore.categoriesMap;
    const category = categoriesMap.get(categoryName);
    if (category) {
        return category;
    } else return null;
}