import CategoryService from "../../../entity/category/service/CategoryService";
import {categoryStore} from "../../../app/store/CategoryStore";
import {Category} from "../../../entity/category/Category";

export function fetchCategory() {
    CategoryService.fetchCategories()
        .then((response) => {
            const respData: Category[] = response.data;
            categoryStore.categories = respData;
            respData.map((category) => {
                categoryStore.categoriesMap.set(category.name, category);
            })
        })
        .catch(err => console.error(err));
}