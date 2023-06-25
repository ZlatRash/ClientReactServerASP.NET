import React, {useEffect} from 'react';
import HeaderWidget from "../../../widgets/header/ui/HeaderWidget";
import ProductTableWidget from "../../../widgets/table/ui/ProductTableWidget";
import {fetchProducts} from "../model/ProductTable";
import {fetchCategory} from "../../category/model/CategoriesTable";


const ProductTablePage = () => {

    useEffect(() => {
        fetchProducts();
        fetchCategory();
    }, [])


    return (
        <>
            <HeaderWidget/>
            <ProductTableWidget/>
        </>
    );
};

export default ProductTablePage;