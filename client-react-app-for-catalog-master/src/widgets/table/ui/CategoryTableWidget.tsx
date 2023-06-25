import React, {JSX} from 'react';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import ColumnTitleFeature from "../../../features/columnTitle/ui/columnTitleFeature";
import {getTitles} from "../../../features/columnTitle/model/ColumnTitle";
import {globalStore} from "../../../app/store/GlobalStore";
import {categoryStore} from "../../../app/store/CategoryStore";
import TextFieldEditorFeature from "../../../features/textFieldEditor/ui/TextFieldEditorFeature";
import CategoryTypeChooserFeature from "../../../features/categoryTypeChooser/ui/CategoryTypeChooserFeature";
import {
    add,
    deleteById,
    editById,
    handleChangeCreatableCategoryName,
    handleChangeEditableCategoryName,
    saveEditing
} from "../model/TableWidget";
import {observer} from "mobx-react";

const CategoryTableWidget = () => {

    const typeOfCategoryMap = categoryStore.typeOfCategoryMap;


    function CategoryEditorManagerButton(props: { categoryId: number }): JSX.Element {
        if (categoryStore.editableCategory !== null && categoryStore.editableCategory.id === props.categoryId) {
            return <TableCell>
                <Button color="success" onClick={() => saveEditing()}>Сохранить</Button>
            </TableCell>
        } else {
            return <TableCell>
                <Button color="primary" onClick={() => editById(props.categoryId)}>Редактировать</Button>
            </TableCell>
        }
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <ColumnTitleFeature titles={getTitles(globalStore.tableSection)}/>
                    <TableBody>
                        {categoryStore.categories.map((category) =>
                            <TableRow key={category.id}>
                                {categoryStore.editableCategory && categoryStore.editableCategory.id === category.id ?
                                    <>
                                        <TableCell>
                                            <TextFieldEditorFeature value={categoryStore.editableCategory.name}
                                                                    onChange={handleChangeEditableCategoryName}/>
                                        </TableCell>
                                        <TableCell>
                                            <CategoryTypeChooserFeature/>
                                        </TableCell>
                                    </>
                                    :
                                    <>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{typeOfCategoryMap.get(category.type)}</TableCell>
                                    </>
                                }
                                <CategoryEditorManagerButton categoryId={category.id}/>
                                <TableCell>
                                    <Button color="error"
                                            onClick={() => deleteById(category.id)}>Удалить</Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextFieldEditorFeature value={categoryStore.creatableCategory.name}
                                                        onChange={handleChangeCreatableCategoryName}/>
                            </TableCell>
                            <TableCell>
                                <CategoryTypeChooserFeature/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button color="secondary" onClick={add}>Добавить категорию</Button>
        </>
    );
};

export default observer(CategoryTableWidget);