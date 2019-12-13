import React from 'react';
import { Drawer, List, ListItemText, Divider, Typography, Badge, ListItem, Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Redirect } from 'react-router';
import "./LeftMenu.css"

export interface Chatroom {
    id: number,
    name: string,
    description: string,
    users: number
}

function fetchChatroom(setChatroomsList: Function) {
        const response =  fetch("https://localhost:8000/rooms", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'cors', // no-cors, *cors, same-origin
        }).then(data => data.json())
        .then(chatList => {console.log(chatList)});

    
}

export default function LeftMenu() {

    const [chatroomsList, setChatroomsList] = React.useState<Chatroom[]>([]);
    const [createChatRedirect, setCreateChatRedirect] = React.useState<boolean>(false)

    fetchChatroom(setChatroomsList);

    if (createChatRedirect) {
        return <Redirect to='/create-chat' />
    }

    const chatItemsComponents = chatroomsList.map((chatRoom, i) => {
        const chatRoomTitleAndUsers = <div> {chatRoom.name} <Badge badgeContent={chatRoom.users}><PersonIcon color="primary"></PersonIcon> </Badge></div>
        return (
                <ListItem button>
                    <ListItemText
                        key={i}
                        primary={chatRoomTitleAndUsers}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                >
                                    {chatRoom.description}
                                </ Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
        );
    })


    return (
        <List id="chat-list" component="nav">
            <ListItemText primary="Chat Rooms" />
            <div id="left-menu-chat-container">

            <List id="chat-list" component="nav">
                <Divider />
                {chatItemsComponents}
            </List>
            </div>
            <Button id="create-chat-button" variant="contained"
                color="secondary"
                onClick={(ev) => { setCreateChatRedirect(true) }}>
                Create Chat
            </Button>
        </List>
    );
} 
