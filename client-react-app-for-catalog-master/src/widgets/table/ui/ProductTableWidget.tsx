import React, {JSX} from 'react';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import ColumnTitleFeature from "../../../features/columnTitle/ui/columnTitleFeature";
import {getTitles} from "../../../features/columnTitle/model/ColumnTitle";
import {globalStore} from "../../../app/store/GlobalStore";
import TextFieldEditorFeature from "../../../features/textFieldEditor/ui/TextFieldEditorFeature";
import {observer} from "mobx-react";
import {productStore} from "../../../app/store/ProductStore";
import {
    add,
    deleteById,
    editById,
    handleChangeCreatableProductName,
    handleChangeCreatableProductPrice, handleChangeEditableProductName,
    handleChangeEditableProductPrice,
    saveEditing
} from "../model/TableWidget";
import CategoryChooserFeature from "../../../features/categoryChooser/ui/CategoryChooserFeature";
import {categoryStore} from "../../../app/store/CategoryStore";

const ProductTableWidget = () => {

    function ProductEditorManagerButton(props: { productId: number }): JSX.Element {
        if (productStore.editableProduct !== null && productStore.editableProduct.id === props.productId) {
            return <TableCell>
                <Button color="success" onClick={() => saveEditing()}>Сохранить</Button>
            </TableCell>
        } else {
            return <TableCell>
                <Button color="primary" onClick={() => editById(props.productId)}>Редактировать</Button>
            </TableCell>
        }
    }

    function getCategoryNameByCategoryId(id: number): string {
        const category = categoryStore.categories.find(category => category.id === id);
        if (category) {
            return category.name
        } else return "Категория не указана"
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <ColumnTitleFeature titles={getTitles(globalStore.tableSection)}/>
                    <TableBody>
                        {productStore.products.map((product) =>
                            <TableRow key={product.id}>
                                {productStore.editableProduct && productStore.editableProduct.id === product.id ?
                                    <>
                                        <TableCell>
                                            <TextFieldEditorFeature value={productStore.editableProduct.name}
                                                                    onChange={handleChangeEditableProductName}/>
                                        </TableCell>
                                        <TableCell>
                                            <CategoryChooserFeature/>
                                        </TableCell>
                                        <TableCell>
                                            <TextFieldEditorFeature value={productStore.editableProduct.price}
                                                                    onChange={handleChangeEditableProductPrice}/>
                                        </TableCell>
                                    </>
                                    :
                                    <>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{getCategoryNameByCategoryId(product.categoryId)}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                    </>
                                }
                                <ProductEditorManagerButton productId={product.id}/>
                                <TableCell>
                                    <Button color="error"
                                            onClick={() => deleteById(product.id)}>Удалить</Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextFieldEditorFeature value={productStore.creatableProduct.name}
                                                        onChange={handleChangeCreatableProductName}/>
                            </TableCell>
                            <TableCell>
                                <CategoryChooserFeature/>
                            </TableCell>
                            <TableCell>
                                <TextFieldEditorFeature value={productStore.creatableProduct.price}
                                                        onChange={handleChangeCreatableProductPrice}/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button color="secondary" onClick={add}>Добавить продукт</Button>
        </>
    );
};

export default observer(ProductTableWidget);