import React from 'react';
import {Route, Routes} from 'react-router-dom';
import PageNotFound from "./pages/error/ui/PageNotFound";
import CategoriesTablePage from "./pages/category/ui/CategoriesTablePage";
import ProductTablePage from "./pages/product/ui/ProductTablePage";
import LoginPage from "./pages/login/ui/LoginPage";
import {userStore} from "./app/store/UserStore";
import UsersPage from "./pages/user/ui/UsersPage";


const Screen = () => {

    return (
        <div>
            <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                {userStore.isAuth &&
                    <>
                        <Route path='/' element={<CategoriesTablePage/>}/>
                        <Route path='/categories' element={<CategoriesTablePage/>}/>
                        <Route path='/products' element={<ProductTablePage/>}/>
                        <Route path='/users' element={<UsersPage/>}/>
                        <Route path='*' element={<PageNotFound/>}/>
                    </>
                }
            </Routes>
        </div>
    );
};

export default Screen;