import React from 'react';
import { Drawer, List, ListItemText, Divider, Typography, Badge, ListItem, Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Redirect } from 'react-router';
import "./LeftMenu.css"
import { connect } from 'react-redux';

export interface Chatroom {
    name: string,
    description: string,
    users: number
}

function fetchChatroom(setChatroomsList: Function, token: string) {
    const response = fetch("https://localhost:8000/rooms", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'auth-token': token,
        },
        mode: 'cors', // no-cors, *cors, same-origin
    }).then(data => data.json())
        .then(chatList => { setChatroomsList(chatList) });
}

function joinChatroom(name: string, token: string) {
    const response = fetch("https://localhost:8000/rooms/" + encodeURI(name), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'auth-token': token,
        },
        mode: 'cors', // no-cors, *cors, same-origin
    }).then(data => data.json())
        .then(msg => { console.log(msg) });
}

interface LeftMenuProps {
    token: string
}

function LeftMenu(props: LeftMenuProps) {

    const [chatroomsList, setChatroomsList] = React.useState<Chatroom[] | null>(null);
    const [createChatRedirect, setCreateChatRedirect] = React.useState<boolean>(false)

    console.log(props.token);
    if (props.token != null && chatroomsList == null) {
        fetchChatroom(setChatroomsList, props.token);
    }
        
    if (createChatRedirect) {
        return <Redirect to='/create-chat' />
    }

    let chatItemsComponents : JSX.Element[] = [];
    if(chatroomsList != null) {
        chatItemsComponents = chatroomsList.map((chatroom, i) => {
            console.log(chatroom.users)
            const chatRoomTitleAndUsers = <div> {chatroom.name} <Badge badgeContent={'' + chatroom.users}><PersonIcon color="primary"></PersonIcon> </Badge></div>
            return (
                <ListItem button onClick={(ev) => {joinChatroom(chatroom.name, props.token)} }>
                    <ListItemText
                        key={i}
                        primary={chatRoomTitleAndUsers}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                >
                                    {chatroom.description}
                                </ Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            );
        });
    }
    


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

const mapStateToProps = (state: any) => ({
    currentUser: state,
    token: state.user.token
});

export default connect(mapStateToProps)(LeftMenu);
