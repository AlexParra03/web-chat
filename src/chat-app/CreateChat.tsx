import React from 'react';
import { Drawer, List, ListItemText, Divider, Typography, Badge, ListItem, Paper, TextField, Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import "./CreateChat.css"
import { Header } from './Header';

interface ChatData {
    title: string | null,
    description: string | null
}

const DESCRIPTION_LIMIT = 20;

function isDescriptionValid(text: string) {
    return text.trim().split(' ').length <= DESCRIPTION_LIMIT && text !== '';
}

export default function CreateChat() {

    const [chatData, setChatData] = React.useState<ChatData>({ title: null, description: null })

    return (
        <Paper >
            <Header />
            <Typography variant="h5" component="h3" id="">
                Pick a title and a description for your chat.
            </Typography>
            <form id="create-chat-container">
                <TextField
                    error={chatData.title == null ? false : chatData.title === ''}
                    required
                    id="standard-required"
                    label="Title"
                    margin="normal"
                    onChange={(ev) => {


                        setChatData(
                            { ...chatData, title: ev.target.value.trim() }
                        )
                    }}
                />

                <br />

                <TextField 
                    error={ chatData.description == null ? false : !isDescriptionValid(chatData.description)}
                    fullWidth
                    required
                    label={`Description about the chat. ${DESCRIPTION_LIMIT} words max.`}
                    margin="normal"
                    onChange={(ev) => {

                        setChatData(
                            { ...chatData, description: ev.target.value.trim() })
                    }}
                />

                <br />

                <Button variant="contained" color="primary" onClick={async (ev) => {

                    // const response = await fetch("https://localhost:8000/register", {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //         // 'Content-Type': 'application/x-www-form-urlencoded',
                    //     },
                    //     mode: 'cors', // no-cors, *cors, same-origin
                    //     body: JSON.stringify(registerData)
                    // });
                    // const json = await response.json();
                    // props.setToken(json.token);
                    // console.log(json);

                }}>
                    Create Chat
                </Button>
            </ form>
        </Paper>
    );
} 
