import React, { Fragment } from 'react'

import {Paper, Divider, TextField, Container, Grid, Typography} from '@material-ui/core'
import {List,  ListItem, ListItemText} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';
import {Button} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import GridList from '@material-ui/core/GridList';

import './Chat.css'
import LeftMenu from './LeftMenu';
import { Header } from '../Header';


type ChatDialog = {
    sender: string,
    text: string
}

const chatMocks : Array<ChatDialog> = [
    {sender: "Alex", text: "Hello"},
    {sender: "Joe", text: "HIII"},
    {sender: "Alexxxxxxxxx xxxxxxxxxxxxxxx", text: "How are you? How are you? How are you? How are you? How are you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Joe", text: "Fine, and you?"},
    {sender: "Alex", text: "Also fine."},
]


export function Chat() {

    const [chatItems, setChatItems] = React.useState<ChatDialog[]>(chatMocks)
    const [inputText, setInputText] = React.useState<string>("");

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

    
    const ws = new WebSocket('ws://helllo:value@localhost:8000/?token=HELLO', "echo-protocol");
    ws.onopen = (ev: any) => {
        ws.send("hello");
    };

    return (

            <Paper >
                <Header />
                <LeftMenu></LeftMenu>
                <Grid container id="chat-form-container">
                    {chatItemsComponents}
                </Grid>
                <div id="chat-form-container">
                    <FormControl id="chat-form">
                        <InputLabel htmlFor="component-simple">Type here</InputLabel>
                        <Input id="component-simple" value={inputText} onChange={(e) => {setInputText(e.target.value)} }  />
                    </FormControl>
                    <Button variant="outlined" id="chat-button">
                        Send
                    </Button>
                </div>
                
            </Paper>
        
    );

}