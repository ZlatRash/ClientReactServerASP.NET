import React from 'react';
import {categoryStore} from "../../../app/store/CategoryStore";
import {TextField} from "@mui/material";
import {setCategoryToProduct} from "../model/CategoryChooser";
import {productStore} from "../../../app/store/ProductStore";

const CategoryChooserFeature = () => {

    const categoriesMap = categoryStore.categoriesMap;

    function getDefaultValueForCategoryName(): string {
        if (productStore.editableProduct) {
            const editableProduct = productStore.editableProduct;
            const category = categoryStore.categories.find(category => category.id === editableProduct.categoryId);
            if (category) return category.name;
            else return "";
        } else {
            const creatableProduct = productStore.creatableProduct;
            const category = categoryStore.categories.find(category => category.id === creatableProduct.categoryId);
            if (category) return category.name;
            else return "";
        }
    }

    const defValueForCategoryName = getDefaultValueForCategoryName();

    return (
        <TextField select size="small"
                   defaultValue={defValueForCategoryName}
                   onChange={(e) => setCategoryToProduct(e.target.value)}
                   SelectProps={{
                       native: true,
                   }}>
            <option defaultValue={"Выберите категорию"}>
                --Выберите категорию--
            </option>
            {Array.from(categoriesMap).map(([name, value]) => (
                <option key={name} value={value.name}>
                    {name}
                </option>
            ))}
        </TextField>
    );
};


export default CategoryChooserFeature;