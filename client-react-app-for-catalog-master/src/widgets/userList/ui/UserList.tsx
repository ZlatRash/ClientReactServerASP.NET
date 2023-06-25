import React, {useEffect, useState} from 'react';
import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import UserService from "../../../entity/user/service/UserService";

const UserList = () => {

        const [users, setUsers] = useState<string[]>([]);

        useEffect(() => {
            fetchUsers();
        }, [])

        async function fetchUsers() {
            try {
                UserService.fetchUsers().then(response => {
                    const users = response.data;
                    if (users.length > 0) {
                        setUsers(users);
                    }
                })
            } catch (e) {
                console.error(e);
            }
        }

        return (
            <List>
                {users.map((user) => {
                    return <ListItem key={user}>
                        <ListItemAvatar>
                            <Avatar/>
                        </ListItemAvatar>
                        <ListItemText primary={`${user}`}/>
                    </ListItem>
                })}
            </List>
        );
    }
;

export default UserList;