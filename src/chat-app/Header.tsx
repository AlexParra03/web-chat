import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChattingIcon from '@material-ui/icons/Forum';
import FriendsIcon from '@material-ui/icons/People';
import ProfileIcon from '@material-ui/icons/AccountBox';
import './Header.css'


import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { Popper, Grow, Paper, ClickAwayListener, MenuList } from "@material-ui/core";
import { Redirect } from "react-router-dom";


export function Header(props: {}) {
    const [chatButtonRef, setChatButtonRef] = React.useState<null | (EventTarget & HTMLButtonElement)>(null);
    const [friendsButtonRef, setFriendsButtonRef] = React.useState<null | (EventTarget & HTMLButtonElement)>(null);
    const [profileButtonRef, setProfileButtonRef] = React.useState<null | (EventTarget & HTMLButtonElement)>(null);

    const [redirectCreateChat, setRedirectCreateChat] = React.useState<boolean>(false);
    const [redirectHome, setRedirectHome] = React.useState<boolean>(false);

    let redirect = null;
    if ( redirectCreateChat) {
        redirect = <Redirect to='/create-chat' />
    }

    if (redirectHome) {
        redirect = <Redirect to='/' />
    }

    return (
        <AppBar position="static">
            {redirect}
            <Toolbar>
                <Typography variant="h5" component="h3" onClick={() => {setRedirectHome(true)}}>
                    APP NAME
                </Typography>
                <div className="menus">
                    <Button variant="contained" color="primary" onClick={(ev) => {
                        if (!!chatButtonRef) {
                            setChatButtonRef(null);

                        } else {
                            setChatButtonRef(ev.currentTarget);
                            setFriendsButtonRef(null);
                            setProfileButtonRef(null);
                        }

                    }}>
                        <ChattingIcon />
                        Chat
                    </Button>

                    <Button variant="contained" color="primary" onClick={(ev) => {
                        if (!!friendsButtonRef) {
                            setFriendsButtonRef(null);
                        } else {
                            setFriendsButtonRef(ev.currentTarget);
                            setChatButtonRef(null);
                            setProfileButtonRef(null);
                        }

                    }}>
                        <FriendsIcon />
                        Friends
                    </Button>
                    <Button variant="contained" color="primary" onClick={(ev) => {
                        if (!!profileButtonRef) {
                            setProfileButtonRef(null);
                        } else {
                            setProfileButtonRef(ev.currentTarget);
                            setChatButtonRef(null);
                            setFriendsButtonRef(null);
                        }
                    }}>
                        <ProfileIcon />
                        Profile
                    </Button>

                    <Popper open={!!chatButtonRef} anchorEl={chatButtonRef} role={undefined} transition disablePortal>

                        <Paper>
                            <ClickAwayListener onClickAway={() => {
                                setProfileButtonRef(null);
                                setChatButtonRef(null);
                                setFriendsButtonRef(null);
                            }}>
                                <MenuList autoFocus={!!chatButtonRef}>
                                    <MenuItem onClick={() => { alert("Not ready") }}>1v1</MenuItem>
                                    <MenuItem onClick={() => { alert("Not ready") }}>1v2</MenuItem>
                                    <MenuItem onClick={() => { setRedirectCreateChat(true) }}>Create Chatroom</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Popper>



                    <Popper open={!!friendsButtonRef} anchorEl={friendsButtonRef} role={undefined} transition disablePortal>

                        <Paper>
                            <ClickAwayListener onClickAway={() => {
                                setProfileButtonRef(null);
                                setChatButtonRef(null);
                                setFriendsButtonRef(null);
                            }}>
                                <MenuList autoFocus={!!friendsButtonRef}>
                                    <MenuItem onClick={() => { alert("Not ready") }}>Friends Online</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Popper>

                    <Popper open={!!profileButtonRef} anchorEl={profileButtonRef} role={undefined} transition disablePortal>

                        <Paper>
                            <ClickAwayListener onClickAway={() => {
                                setProfileButtonRef(null);
                                setChatButtonRef(null);
                                setFriendsButtonRef(null);
                            }}>
                                <MenuList autoFocus={!!profileButtonRef} onKeyDown={() => { console.log("closed") }}>
                                    <MenuItem onClick={() => { alert("Not ready") }}>My Settings</MenuItem>
                                    <MenuItem onClick={() => { alert("Not ready") }}>Log out</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Popper>

                </div>


            </Toolbar>
        </AppBar>
    )
}