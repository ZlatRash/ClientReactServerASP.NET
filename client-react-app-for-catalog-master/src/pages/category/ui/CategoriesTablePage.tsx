import React, {FC, useEffect} from 'react';
import HeaderWidget from "../../../widgets/header/ui/HeaderWidget";
import {fetchCategory} from '../model/CategoriesTable';
import CategoryTableWidget from "../../../widgets/table/ui/CategoryTableWidget";


const CategoriesTablePage: FC = () => {


    useEffect(() => {
        fetchCategory();
    }, [])


    return (
        <>
            <HeaderWidget/>
            <CategoryTableWidget/>
        </>
    );
};

export default CategoriesTablePage;