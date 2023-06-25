import {makeAutoObservable, runInAction} from "mobx";
import {Category, CategoryType} from "../../entity/category/Category";

class CategoryStore {

    private _categories: Category[] = [];
    private _categoriesMap = new Map<string, Category>()
    private _editableCategory: Category | null = null;
    private _creatableCategory: Category = {id: -1, name: "", type: CategoryType.FRUITS};
    private _lastLinkedCategory: Category | null = null;
    private _typeOfCategoryMap = new Map<CategoryType, string>();

    constructor() {
        makeAutoObservable(this);
        this._typeOfCategoryMap.set(CategoryType.FRUITS, "Фрукты");
        this._typeOfCategoryMap.set(CategoryType.VEGETABLES, "Овощи");
        this._typeOfCategoryMap.set(CategoryType.OTHERS_PRODUCTS, "Другие товары");
    }


    get lastLinkedCategory(): Category | null {
        return this._lastLinkedCategory;
    }

    set lastLinkedCategory(value: Category | null) {
        this._lastLinkedCategory = value;
    }

    get categoriesMap(): Map<string, Category> {
        return this._categoriesMap;
    }

    set categoriesMap(value: Map<string, Category>) {
        this._categoriesMap = value;
    }

    get categories(): Category[] {
        return this._categories;
    }

    set categories(value: Category[]) {
        runInAction(() => {
            this._categories = value;
        })
    }

    get editableCategory(): Category | null {
        return this._editableCategory;
    }

    set editableCategory(value: Category | null) {
        runInAction(() => {
            this._editableCategory = value;
        })
    }

    public addCategory(category: Category) {
        this._categories.push(category);
    }


    get typeOfCategoryMap(): Map<CategoryType, string> {
        return this._typeOfCategoryMap;
    }

    get creatableCategory(): Category {
        return this._creatableCategory;
    }

    set creatableCategory(value: Category) {
        this._creatableCategory = value;
    }
}

export const categoryStore = new CategoryStore();

