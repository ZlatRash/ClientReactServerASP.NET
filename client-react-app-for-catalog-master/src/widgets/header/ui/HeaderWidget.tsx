import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, {FC} from 'react';
import {TableSection} from "../../../entity/GlobalTypes";
import {chooseTableSection} from "../model/HeaderWidget";
import {globalStore} from "../../../app/store/GlobalStore";
import {observer} from "mobx-react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import LogoutButton from "../../../features/logout/ui/LogoutButton";


const HeaderWidget: FC = () => {

    const navigate = useNavigate();

    function openCategoriesPage() {
        navigate("/categories");
    }

    function openProductPage() {
        navigate("/products");
    }

    function openUsersPage() {
        navigate("/users");
    }

    const handleChange = (event: React.SyntheticEvent, newValue: TableSection) => {
        chooseTableSection(newValue);
        switch (newValue) {
            case TableSection.CATEGORIES:
                openCategoriesPage();
                globalStore.tableSection = TableSection.CATEGORIES;
                break;
            case TableSection.PRODUCTS:
                openProductPage();
                globalStore.tableSection = TableSection.PRODUCTS;
                break;
            case TableSection.USERS:
                openUsersPage();
                globalStore.tableSection = TableSection.USERS;
                break;
            default:
                break;
        }
    };


    return (
        <HeaderContainer>
            <Tabs
                value={globalStore.tableSection}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                <Tab value={TableSection.CATEGORIES} label="Категории"/>
                <Tab value={TableSection.PRODUCTS} label="Продукты"/>
                <Tab value={TableSection.USERS} label="Пользователи"/>
            </Tabs>
            <LogoutButton/>
        </HeaderContainer>
    );
};

export default observer(HeaderWidget);

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`