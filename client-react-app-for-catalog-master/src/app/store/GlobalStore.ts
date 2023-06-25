import {makeAutoObservable} from "mobx";
import {TableSection} from "../../entity/GlobalTypes";


class GlobalStore {

    private _tableSection: TableSection = TableSection.CATEGORIES;

    constructor() {
        makeAutoObservable(this);
    }

    get tableSection(): TableSection {
        return this._tableSection;
    }

    set tableSection(value: TableSection) {
        this._tableSection = value;
    }
}

export const globalStore = new GlobalStore();
