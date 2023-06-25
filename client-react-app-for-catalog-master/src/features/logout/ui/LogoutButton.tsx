import React, {FC} from 'react';
import {Button} from "@mui/material";
import {userStore} from "../../../app/store/UserStore";
import { observer } from 'mobx-react';

const LogoutButton: FC = () => {
    return (
        <Button onClick={() => userStore.logout()} variant="outlined" color="error">
            Выйти
        </Button>
    );
};

export default observer(LogoutButton);