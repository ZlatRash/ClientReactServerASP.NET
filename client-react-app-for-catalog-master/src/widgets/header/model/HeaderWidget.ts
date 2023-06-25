import {TableSection} from "../../../entity/GlobalTypes";
import {globalStore} from "../../../app/store/GlobalStore";

export function chooseTableSection(tableSection: TableSection): void {
    switch (tableSection) {
        case TableSection.CATEGORIES:
            globalStore.tableSection = TableSection.CATEGORIES;
            return;
        case TableSection.PRODUCTS:
            globalStore.tableSection = TableSection.PRODUCTS;
            return;
        case TableSection.USERS:
            globalStore.tableSection = TableSection.USERS;
            return;
        default:
            return;
    }
}