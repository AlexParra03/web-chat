import React, { Fragment } from 'react'

import { Paper, Divider, TextField, Container, Grid, Typography, Tab, Tabs } from '@material-ui/core'
import { List, ListItem, ListItemText } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Chatroom } from './LeftMenu';
import GridList from '@material-ui/core/GridList';

import { Redirect } from 'react-router-dom';
import './ChatContainer.css'
import LeftMenuMobil from './LeftMenuMobil';
import LeftMenu from './LeftMenu';
import { Header } from './Header';
import { connect } from 'react-redux';



interface ChatDialog {
    sender: string,
    text: string
}

interface WebsocketChat {
    token: string,
    message: string,
}

// No tuplicated TABS / ROOMS
let currentRooms: string[] = [];

const chatMocks: ChatDialog[] = [
    { sender: "Alex", text: "Hello" },
]

interface ChatProps {
    token: string,
    rooms: string[]
}

function createTabs(tabs: string[], setCurrentTab: Function) {
    const tabsElements = [];
    for (const tab of tabs) {
        tabsElements.push(
            <Tab label={tab} value={tab} onClick={(ev) => { setCurrentTab(tab) }} />
        )
    }
    return tabsElements;
}

function Chat(props: ChatProps) {

    const [chatItems, setChatItems] = React.useState<ChatDialog[]>([])
    const [inputText, setInputText] = React.useState<string>("");
    const [currentTab, setCurrentTab] = React.useState<string | null>(null)
    // const [activeRooms, setActiveRooms] = React.useState<string[] | null>(null)
    const [websocket, setWebsocket] = React.useState<WebSocket | null>(null);
    // if (activeRooms == null) {
    //     fetch("https://localhost:8000/my-rooms", {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'auth-token': props.token
    //             // 'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         mode: 'cors', // no-cors, *cors, same-origin
    //     }).then(res => res.json())
    //         .then(rooms => {
    //             setActiveRooms(rooms);
    //         });
    // }

    console.log('F', chatItems);
    const chatItemsComponents = chatItems.map((dialog, i) => {
        return (
            <> <ListItem key={i} > <ListItemText key={i} primary={dialog.sender + ': ' + dialog.text} />  </ ListItem> <Divider /> </>)
    });

    const chatItemst = chatMocks.map((dialog, i) => {
        return (
            <Fragment key={i}>
                <Grid item xs={12}>

                    <Typography variant="subtitle1" className="chat-sender">
                        {dialog.sender}
                    </Typography>
                    <Typography variant="h6" className="chat-text">
                        {dialog.text}
                    </Typography>

                    <Divider />
                </Grid>
            </Fragment>
        );
    });

    document.cookie = "MYCOOKIE";
    if (websocket == null) {
        const ws = new WebSocket(`wss://localhost:8000/chat?token=${encodeURI(props.token)}`, "echo-protocol");
        setWebsocket(ws);
        ws.onmessage = (ev) => { console.log(chatItems); receiveMessage(JSON.parse(ev.data), chatItems, setChatItems) }
        ws.onopen = (ev: any) => {
            const object: WebsocketChat = {
                token: props.token,
                message: "hello"
            };
            ws.send(JSON.stringify(object));
        };
    }



    return (

        <Paper >
            <Header />

            <Grid container>
                <Grid item xs={2} >
                    <LeftMenu></LeftMenu>
                </Grid>
                <Grid item xs={10} >

                    {props.rooms != null && props.rooms.length > 0 ?
                        <Tabs value={currentTab} scrollButtons="auto" variant="scrollable" >
                            {createTabs(props.rooms, setCurrentTab)}
                        </Tabs> : null}

                    <div>
                        <Grid container id="chat-form-container">
                            {chatItemsComponents}
                        </Grid>
                    </ div>

                </Grid>
                <form onSubmit={(ev) => {
                    ev.preventDefault();
                    if (websocket != null) {
                        sendMessage(websocket, props.token, inputText, setInputText);
                    }
                    return false;
                }}>
                    <FormControl id="chat-form">
                        <InputLabel htmlFor="chat-input-bar">Type here</InputLabel>
                        <Input id="chat-input-bar" value={inputText} onChange={(e) => { setInputText(e.target.value) }} />
                    </FormControl>
                    <Button variant="outlined" id="chat-button" type="submit">
                        Send
                        </Button>
                </form>

            </Grid>
        </Paper>

    );

}

function receiveMessage(message: ChatDialog, currentChatItems: ChatDialog[], setChatItems: Function) {
    const newDialogs = [];
    let key = 0;
    for (const chatItem of currentChatItems) {
        newDialogs.push({ ...chatItem, key: key })
        key++
    }
    newDialogs.push(message);
    setChatItems(newDialogs);
    console.log('xd', message, currentChatItems, newDialogs);
}

function sendMessage(ws: WebSocket, token: string, message: string, clearInputText: Function) {
    const payload = { token, message };
    clearInputText('');
    console.log(ws);
    ws.send(JSON.stringify(payload));
    console.log("SENT:", payload);
}

function mapStateToPros(state: any) {
    return {
        token: state.user.token,
        rooms: state.user.rooms
    }
}

export default connect(mapStateToPros)(Chat);