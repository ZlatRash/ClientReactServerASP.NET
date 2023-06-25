import React, {useState} from 'react';
import {userStore} from "../../../app/store/UserStore";
import {observer} from "mobx-react";
import {Button, TextField} from "@mui/material";
import styled from "styled-components";

interface ILoginForm {
    username: string;
    password: string;
}

const LoginPage = () => {
    const [loginForm, setLoginForm] = useState<ILoginForm>({
        username: "",
        password: "",
    });

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setLoginForm({...loginForm, [event.target.name]: event.target.value});
    };


    return (
        <LoginFormContainer>
            <TextField
                type="text"
                name="username"
                label="Имя пользователя"
                onChange={handleChange}
                value={loginForm.username}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                type="password"
                name="password"
                label="Пароль"
                onChange={handleChange}
                value={loginForm.password}
                InputLabelProps={{ shrink: true }}
            />
            <Button variant="outlined" color="secondary" type="submit" onClick={() => userStore.login(loginForm.username, loginForm.password)}>Войти</Button>
        </LoginFormContainer>
    );
};

export default observer(LoginPage);

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 25px;
`