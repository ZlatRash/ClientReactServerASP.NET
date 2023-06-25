import {AxiosResponse} from "axios";
import $api from "../../../app/constant/GlobalConstants";
import {Category} from "../Category";

export default class CategoryService {

    /**Получение категорий*/
    static async fetchCategories(): Promise<AxiosResponse<Category[]>> {
        return $api.get<Category[]>("/Category")
    }

    /**Добавление категории*/
    static async addCategory(category: Category): Promise<AxiosResponse<Category>> {
        return $api.put<Category>("/Category", category);
    }

    /**Добавление категории по id*/
    static async editCategoryById(id: number, category: Category): Promise<AxiosResponse<Category>> {
        return $api.post<Category>(`/Category/${id}`, category);
    }

    /**Получение категории по id*/
    static async fetchCategoryById(id: number): Promise<AxiosResponse<Category>> {
        return $api.post<Category>(`/Category/${id}`);
    }

    /**Удаление категории по id*/
    static async deleteCategoryById(id: number): Promise<AxiosResponse<Category>> {
        return $api.delete<Category>(`/Category/${id}`);
    }

}