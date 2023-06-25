import {User} from "./user/User";

export type AuthResponse = {
    token:string;
    status:number;
    user: User;
}

export enum TableSection {

    CATEGORIES,

    PRODUCTS,
    USERS
}