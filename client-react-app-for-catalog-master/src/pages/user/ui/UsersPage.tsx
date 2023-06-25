import React, {FC} from 'react';
import HeaderWidget from "../../../widgets/header/ui/HeaderWidget";
import UserList from "../../../widgets/userList/ui/UserList";

const UsersPage: FC = () => {
    return (
        <>
            <HeaderWidget/>
            <UserList/>
        </>
    );
};

export default UsersPage;