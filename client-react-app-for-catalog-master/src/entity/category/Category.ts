export type Category = {
    id: number;
    name: string;
    type: CategoryType;
}

export enum CategoryType {
    VEGETABLES = 1,

    FRUITS = 2,

    OTHERS_PRODUCTS = 3,
}