import React from 'react';
import {Drawer, List, ListItemText, Divider, Typography, Badge, ListItem} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import './LeftMenuMobil.css'

const chatRooomsMock = [
    {
        title: "Cars chat",
        description: "This chat is about cars, specially nizzan and chevrolet",
        users: 27
    },
    {
        title: "Cars chat",
        description: "This chat is about cars, specially nizzan and chevrolet",
        users: 27
    },
    {
        title: "Cars chat",
        description: "This chat is about cars, specially nizzan and chevrolet",
        users: 27
    },
    {
        title: "Cars chat",
        description: "This chat is about cars, specially nizzan and chevrolet",
        users: 27
    },
    {
        title: "Cars chat",
        description: "This chat is about cars, specially nizzan and chevrolet aaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa",
        users: 27
    }
]

export default function LeftMenuMobil() {

    const chatItemsComponents = chatRooomsMock.map( (chatRoom, i) => {
        const chatRoomTitleAndUsers = <div> {chatRoom.title} <Badge badgeContent={chatRoom.users}><PersonIcon color="primary"></PersonIcon> </Badge></div>
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
        <Drawer open={false} >
            <List id="chat-list" component="nav">
                <ListItemText primary="Chat Rooms" />
                <Divider />
                {chatItemsComponents}
            </List>
        </Drawer>
    );
} 
