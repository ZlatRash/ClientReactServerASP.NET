import React, {FC} from 'react';
import {TextField} from "@mui/material";
import {categoryStore} from "../../../app/store/CategoryStore";
import {setTypeOfCategory} from "../model/CategoryTypeChooser";
import {observer} from "mobx-react";


const CategoryTypeChooserFeature: FC = () => {

    const typeOfCategoryMap = categoryStore.typeOfCategoryMap;

    return (
            <TextField select size="small"
                       defaultValue={categoryStore.editableCategory ? categoryStore.editableCategory.type : categoryStore.creatableCategory.type}
                       onChange={(e) => setTypeOfCategory(e.target.value)}
                       SelectProps={{
                           native: true,
                       }}>
                <option defaultValue={"Выберите категорию"}>
                    --Выберите категорию--
                </option>
                {Array.from(typeOfCategoryMap).map(([key, value]) => (
                    <option key={key} value={value}>
                        {value}
                    </option>
                ))}
            </TextField>
    );
};

export default observer(CategoryTypeChooserFeature);