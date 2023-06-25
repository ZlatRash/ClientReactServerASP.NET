import CategoryTableManager from "./CategoryTableManager";
import {categoryStore} from "../../../app/store/CategoryStore";
import React from "react";
import {TableSection} from "../../../entity/GlobalTypes";
import ProductTableManager from "./ProductTableManager";
import {productStore} from "../../../app/store/ProductStore";
import {globalStore} from "../../../app/store/GlobalStore";

const categoryTableManager = new CategoryTableManager();
const productTableManager = new ProductTableManager();



export function add(): void {
    const tableSection = globalStore.tableSection;
    switch (tableSection) {
        case TableSection.PRODUCTS:
            productTableManager.add();
            break;
        case TableSection.CATEGORIES:
            categoryTableManager.add();
            break;
        default:
            break;
    }
}

export function deleteById(id: number): void {
    const tableSection = globalStore.tableSection;
    switch (tableSection) {
        case TableSection.PRODUCTS:
            productTableManager.deleteById(id);
            break;
        case TableSection.CATEGORIES:
            categoryTableManager.deleteById(id);
            break;
        default:
            break;
    }
}

export function editById(id: number): void {
    const tableSection = globalStore.tableSection;
    switch (tableSection) {
        case TableSection.PRODUCTS:
            productTableManager.editById(id);
            break;
        case TableSection.CATEGORIES:
            categoryTableManager.editById(id);
            break;
        default:
            break;
    }
}

export function saveEditing(): void {
    const tableSection = globalStore.tableSection;
    switch (tableSection) {
        case TableSection.PRODUCTS:
            productTableManager.saveEditing();
            break;
        case TableSection.CATEGORIES:
            categoryTableManager.saveEditing();
            break;
        default:
            break;
    }
}

export const handleChangeEditableCategoryName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (categoryStore.editableCategory === null) return;
    categoryStore.editableCategory.name = event.target.value;
};

export const handleChangeCreatableCategoryName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    categoryStore.creatableCategory.name = event.target.value;
};

export const handleChangeEditableProductName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (productStore.editableProduct === null) return;
    productStore.editableProduct.name = event.target.value;
};
export const handleChangeEditableProductPrice = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (productStore.editableProduct === null) return;
    productStore.editableProduct.price = parseFloat(event.target.value);
};
export const handleChangeCreatableProductName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    productStore.creatableProduct.name = event.target.value;
};
export const handleChangeCreatableProductPrice = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    productStore.creatableProduct.price = parseFloat(event.target.value);
};

