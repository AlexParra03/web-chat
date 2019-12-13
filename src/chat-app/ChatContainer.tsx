import React, { Fragment } from 'react'

import { Paper, Divider, TextField, Container, Grid, Typography, Tab, Tabs } from '@material-ui/core'
import { List, ListItem, ListItemText } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {Chatroom} from './LeftMenu';
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

// No tuplicated TABS / ROOMS
let currentRooms: string[] = [];

const chatMocks: Array<ChatDialog> = [
    { sender: "Alex", text: "Hello" },
    { sender: "Joe", text: "HIII" },
    { sender: "Alexxxxxxxxx xxxxxxxxxxxxxxx", text: "How are you? How are you? How are you? How are you? How are you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Joe", text: "Fine, and you?" },
    { sender: "Alex", text: "Also fine." },
]

interface ChatProps {
    token: string
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

    const [chatItems, setChatItems] = React.useState<ChatDialog[]>(chatMocks)
    const [inputText, setInputText] = React.useState<string>("");
    const [currentTab, setCurrentTab] = React.useState<string | null>(null)
    const [activeRooms, setActiveRooms] = React.useState<string[] | null>(null)

    if(activeRooms == null) {
        fetch("https://localhost:8000/rooms", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': props.token
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'cors', // no-cors, *cors, same-origin
        }).then(res => res.json())
            .then(rooms => {
                setActiveRooms(rooms.map( function(room: Chatroom) {return room.name} ));
            });
    }



    const chatItemsComponents = chatMocks.map((dialog, i) => {
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
    console.log('XXX', props.token);
    const ws = new WebSocket(`wss://helllo:value@localhost:8000/main?token=${encodeURI(props.token)}`, "echo-protocol");
    ws.onopen = (ev: any) => {
        ws.send("hello");
    };


    return (

        <Paper >
            <Header />

            <Grid container>
                <Grid item xs={2} >
                    <LeftMenu></LeftMenu>
                </Grid>
                <Grid item xs={10} >

                    {activeRooms != null && activeRooms.length > 0 ?
                        <Tabs value={currentTab} scrollButtons="auto" variant="scrollable" >
                            {createTabs(activeRooms, setCurrentTab)}
                        </Tabs> : null}

                    <div>
                        <Grid container id="chat-form-container">
                            {chatItemsComponents}
                        </Grid>
                    </ div>

                </Grid>
                <FormControl id="chat-form">
                    <InputLabel htmlFor="component-simple">Type here</InputLabel>
                    <Input id="component-simple" value={inputText} onChange={(e) => { setInputText(e.target.value) }} />
                </FormControl>
                <Button variant="outlined" id="chat-button">
                    Send
                        </Button>

            </Grid>
        </Paper>

    );

}

function mapStateToPros(state: any) {
    return { token: state.user.token }
}

export default connect(mapStateToPros)(Chat);