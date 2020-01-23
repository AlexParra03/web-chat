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
import setChats from '../redux/user/setChats';



export interface ChatDialog {
    sender: string,
    text: string
}

interface WebsocketChatToServer {
    token: string,
    message: string,
    room: string
}

interface WebsocketChatToClient {
    username: string,
    message: string,
    room: string
}

// No tuplicated TABS / ROOMS
let currentRooms: string[] = [];

const chatMocks: ChatDialog[] = [
    { sender: "Alex", text: "Hello" },
]

interface ChatProps {
    token: string,
    rooms: string[],
    setChats: Function
    chats: { [chatroom: string]: ChatDialog[] }
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

    // const [intervalSet, forceUpdate] = React.useState<boolean>(false);
    const [chatItems, setChatItems] = React.useState<ChatDialog[]>([])
    const [inputText, setInputText] = React.useState<string>("");
    const [currentTab, setCurrentTab] = React.useState<string | null>(null)
    // const [activeRooms, setActiveRooms] = React.useState<string[] | null>(null)
    const [websocket, setWebsocket] = React.useState<WebSocket | null>(null);

    if (props.rooms && props.rooms.length == 1 && currentTab == null) {
        setCurrentTab(props.rooms[0]);
    }

    // if (!intervalSet) {
    //     setInterval( () => {forceUpdate(true); console.log("UPDATED")}, 200);
    // }

    const chatItemsComponents = chatItems.map((dialog, i) => {
        return (
            <> <ListItem key={i} > <ListItemText key={i} primary={dialog.sender + ': ' + dialog.text} />  </ ListItem> <Divider /> </>)
    });

    let chatItemst = null;
    if (currentTab != null && currentTab in props.chats) {
        console.log("HELLOOO");
        chatItemst = props.chats[currentTab].map((dialog : ChatDialog, i : number) => {
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
    }


    document.cookie = "MYCOOKIE";
    if (websocket == null) {
        const ws = new WebSocket(`wss://localhost:8000/chat?token=${encodeURI(props.token)}`, "echo-protocol");
        setWebsocket(ws);
        ws.onmessage = (ev) => { console.log("MESSAGE RECEIVED"); receiveMessage(JSON.parse(ev.data), props.setChats); }
        ws.onopen = (ev: any) => {
            const object: WebsocketChatToServer = {
                token: props.token,
                message: "hello",
                room: 'None'
            };
            ws.send(JSON.stringify(object));
        };
    }


    const chatForm = <form onSubmit={(ev) => {
        ev.preventDefault();
        if (websocket != null && currentTab != null) {
            sendMessage(websocket, props.token, inputText, setInputText, currentTab);
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
    </form>;

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
                            {chatItemst}
                        </Grid>
                    </ div>

                    {props.rooms != null && props.rooms.length > 0 ? chatForm : null}
                </Grid>
            </Grid>
        </Paper>

    );

}

function receiveMessage(message: WebsocketChatToClient, setChats: Function) {
    const chatMessage: ChatDialog = { sender: message.username, text: message.message }
    setChats(message.room, chatMessage);
}

function sendMessage(ws: WebSocket, token: string, message: string, clearInputText: Function, room: string) {
    const payload: WebsocketChatToServer = { token, message, room };
    clearInputText('');
    console.log(ws);
    ws.send(JSON.stringify(payload));
}

function mapStateToPros(state: any) {
    return {
        token: state.user.token,
        rooms: state.user.rooms,
        chats: state.user.chats
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    setChats: (room: string, chatMessage: ChatDialog) => dispatch(setChats(room, chatMessage))
});


export default connect(mapStateToPros, mapDispatchToProps)(Chat);