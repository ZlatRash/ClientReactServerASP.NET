import TableManager from "./TableManager";
import {categoryStore} from "../../../app/store/CategoryStore";
import IdUtils from "../../../shared/utils/IdUtils";
import CategoryService from "../../../entity/category/service/CategoryService";
import { CategoryType } from "../../../entity/category/Category";

export default class CategoryTableManager extends TableManager {

    public add():void {
        if (categoryStore.creatableCategory.name.length === 0) return;
        const category = {
            id: IdUtils.makeOriginalId(categoryStore.categories),
            name: categoryStore.creatableCategory.name,
            type: categoryStore.creatableCategory.type
        };
        categoryStore.addCategory(category);
        CategoryService.addCategory(category);
        categoryStore.creatableCategory = {id: -1, name: "", type: CategoryType.FRUITS};
    }
    public deleteById(id: number) {
        categoryStore.categories = IdUtils.getArrayFilteredById(id, categoryStore.categories);
        CategoryService.deleteCategoryById(id);
    }
    public editById(id: number) {
        let _editableCategory = IdUtils.getItemById(id, categoryStore.categories);
        if (!_editableCategory) return;
        categoryStore.editableCategory = _editableCategory;
    }
    public saveEditing() {
        let oldCategories = categoryStore.categories;
        if (categoryStore.editableCategory === null) return;
        const idOfEditableCategory = categoryStore.editableCategory.id;
        const indexOfCategory = categoryStore.categories.findIndex((category) => category.id === idOfEditableCategory);
        const editableCategory = categoryStore.editableCategory;
        oldCategories.splice(indexOfCategory, 1, editableCategory);
        categoryStore.categories = oldCategories;
        CategoryService.editCategoryById(editableCategory.id, editableCategory);
        categoryStore.editableCategory = null;
    }
}