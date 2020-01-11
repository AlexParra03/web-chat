import React from 'react';
import { Drawer, List, ListItemText, Divider, Typography, Badge, ListItem, Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Redirect } from 'react-router';
import "./LeftMenu.css"
import { connect } from 'react-redux';
import setRooms from '../redux/user/setRooms';

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

async function joinChatroom(name: string, token: string, setChatrooms: Function, currentRooms: string[] | null) {
    try {
        const response = await fetch("https://localhost:8000/rooms/" + encodeURI(name), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'auth-token': token,
            },
            mode: 'cors', // no-cors, *cors, same-origin
        });
        // }).then(data => data.json())
        //     .then(msg => {
        //         console.log(msg)
        //         // if no error
        //         if (currentRooms == null) {
        //             setChatrooms([name]);
        //         } else {
        //             if (currentRooms.filter(el => el === name).length === 0) {
        //                 setChatrooms([...currentRooms, name]);
        //             }
        //         }
        //     });

        const msg = await response.json();
        console.log(msg)
        // if no error
        if (currentRooms == null) {
            setChatrooms([name]);
        } else {
            if (currentRooms.filter(el => el === name).length === 0) {
                setChatrooms([...currentRooms, name]);
            }
        }
    } catch (error) {
        console.log("Error joining rooms")
    }


}

interface LeftMenuProps {
    token: string
    setRooms: Function,
    rooms: string[] | null
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

    let chatItemsComponents: JSX.Element[] = [];
    if (chatroomsList != null) {
        chatItemsComponents = chatroomsList.map((chatroom, i) => {
            const chatRoomTitleAndUsers = <div> {chatroom.name} <Badge badgeContent={'' + chatroom.users}><PersonIcon color="primary"></PersonIcon> </Badge></div>
            return (
                <ListItem button onClick={async (ev) => {
                    await joinChatroom(chatroom.name, props.token, props.setRooms, props.rooms);
                    // This refreshes stats after async call
                    fetchChatroom(setChatroomsList, props.token);
                }}>
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
    token: state.user.token,
    rooms: state.user.rooms
});

const mapDispatchToProps = (dispatch: any) => ({
    setRooms: (rooms: string[]) => dispatch(setRooms(rooms))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftMenu);
