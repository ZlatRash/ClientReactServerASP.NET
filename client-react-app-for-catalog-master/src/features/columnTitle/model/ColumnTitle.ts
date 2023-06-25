import {TableSection} from "../../../entity/GlobalTypes";

export function getTitles(tableSection: TableSection): string[] {
    switch (tableSection) {
        case TableSection.CATEGORIES:
            return ["Название категории", "Тип категории"]
        case TableSection.PRODUCTS:
            return ["Название продукта", "Категория", "Цена"];
        default:
            return [];

    }
}
