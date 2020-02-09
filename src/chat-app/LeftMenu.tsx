import React from 'react';
import { Drawer, List, ListItemText, Divider, Typography, Badge, ListItem, Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Redirect } from 'react-router';
import "./LeftMenu.css"
import { connect } from 'react-redux';
import setRooms from '../redux/user/setRooms';
import setChatroomList from '../redux/user/setChatroomList';

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

export async function getMyRooms(token: string, setChatrooms: Function) {
    try {
        const response = await fetch("https://localhost:8000/my-rooms", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'auth-token': token,
            },
            mode: 'cors', // no-cors, *cors, same-origin
        });

        const rooms = await response.json();
        setChatrooms(rooms);

    } catch (error) {
        console.log("Error retrieving rooms")
    }
}

async function joinChatroom(name: string, token: string, setChatrooms: Function, currentRooms: string[] | null) {
    try {
        const response = await fetch("https://localhost:8000/join-room/" + encodeURI(name), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'auth-token': token,
            },
            mode: 'cors', // no-cors, *cors, same-origin
        });

        const msg = await response.json();
        console.log(msg)
        // if no error

        await getMyRooms(token, setChatrooms);
    } catch (error) {
        console.log("Error joining rooms")
    }


}

interface LeftMenuProps {
    token: string
    setRooms: Function,
    rooms: string[] | null,
    roomlist: Chatroom[] | null,
    setChatroomList: Function
}

function LeftMenu(props: LeftMenuProps) {

    // const [chatroomsList, setChatroomsList] = React.useState<Chatroom[] | null>(null);
    if ( props.roomlist == null) {
        fetchChatroom(props.setChatroomList, props.token);
    }


    let chatItemsComponents: JSX.Element[] = [];
    if (props.roomlist != null) {
        console.log(props.roomlist, 'O');
        chatItemsComponents = props.roomlist.map((chatroom, i) => {
            const chatRoomTitleAndUsers = <div> {chatroom.name} <Badge badgeContent={'' + chatroom.users}><PersonIcon color="primary"></PersonIcon> </Badge></div>
            return (
                <ListItem button onClick={async (ev) => {
                    await joinChatroom(chatroom.name, props.token, props.setRooms, props.rooms);
                    // This refreshes stats after async call
                    fetchChatroom(props.setChatroomList, props.token);
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
        </List>
    );
}

const mapStateToProps = (state: any) => ({
    token: state.user.token,
    rooms: state.user.rooms,
    roomlist: state.user.roomlist
});

const mapDispatchToProps = (dispatch: any) => ({
    setRooms: (rooms: string[]) => dispatch(setRooms(rooms)),
    setChatroomList: (rooms: Chatroom[]) => dispatch(setChatroomList(rooms))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftMenu);
