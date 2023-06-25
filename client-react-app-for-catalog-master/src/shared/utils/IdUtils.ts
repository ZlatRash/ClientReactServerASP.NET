interface WithId {
    id: number;
}

export default class IdUtils {

    public static makeOriginalId<T extends WithId>(currentArray: T[]): number {
        const randomId = Math.floor(Math.random() * 100000);
        if (currentArray.length === 0) return randomId;
        currentArray.forEach((item) => {
            if (item.id === randomId) {
                this.makeOriginalId(currentArray);
            }
        })
        return randomId;
    }

    public static getArrayFilteredById<T extends WithId>(id: number, arrayOfItems: T[]): T[] {
        let array = arrayOfItems;
        array = array.filter(item => item.id !== id);
        return array;
    }

    public static getItemById<T extends WithId>(id: number, arrayOfItems: T[]): T | null {
        const item = arrayOfItems.find(category => category.id === id);
        if (!item) return null;
        return item;
    }
}