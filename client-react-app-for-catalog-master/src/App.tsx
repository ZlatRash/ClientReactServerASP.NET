import React, { useEffect } from 'react';
import Screen from "./Screen";
import {BrowserRouter} from "react-router-dom";
import {userStore} from "./app/store/UserStore";
import LoginPage from "./pages/login/ui/LoginPage";
import {observer} from "mobx-react";

function App() {

    useEffect(() => {
        if (localStorage.getItem('token')) {
            userStore.checkAuth();
        }
    }, [])

    if (!userStore.isAuth) {
        return (
            <div>
                <LoginPage/>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <div className="container">
                <Screen/>
            </div>
        </BrowserRouter>
    );
}

export default observer(App);
