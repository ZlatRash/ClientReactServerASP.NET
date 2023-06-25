import {categoryStore} from "../../../app/store/CategoryStore";
import { CategoryType } from "../../../entity/category/Category";

const typeOfCategoryMap = categoryStore.typeOfCategoryMap;


export function setTypeOfCategory(value: string): void {
    switch (value) {
        case typeOfCategoryMap.get(CategoryType.FRUITS):
            if (categoryStore.editableCategory) {
                categoryStore.editableCategory.type = CategoryType.FRUITS;
            } else {
                categoryStore.creatableCategory.type = CategoryType.FRUITS;
            }
            return;
        case typeOfCategoryMap.get(CategoryType.VEGETABLES):
            if (categoryStore.editableCategory) {
                categoryStore.editableCategory.type = CategoryType.VEGETABLES;
            } else {
                categoryStore.creatableCategory.type = CategoryType.VEGETABLES;
            }
            return;
        case typeOfCategoryMap.get(CategoryType.OTHERS_PRODUCTS):
            if (categoryStore.editableCategory) {
                categoryStore.editableCategory.type = CategoryType.OTHERS_PRODUCTS;
            } else {
                categoryStore.creatableCategory.type = CategoryType.OTHERS_PRODUCTS;
            }
            return;
        default:
            return;
    }
}