import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Paper, FormControl, InputLabel, Input, TextField, Grid, Button } from '@material-ui/core';
import { Header } from './chat-app/Header';

// import {Redirect} from 'react-router';
import "./Home.css";
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import setCurrentUser from './redux/user/setCurrentUser';
import setToken from './redux/user/setToken';

interface RegisterData {
    nickname: string,
    email: string,
    password: string,
    rePassowrd: string,
}

interface LoginData {
    nickname: string,
    password: string
}

interface HomeProps {
    currentUser: string,
    token: string
}

function Home(props: any) {

    const [registerData, setRegistedData] = React.useState<RegisterData>({ nickname: '', email: '', password: '', rePassowrd: '' });
    const [loginData, setLoginData] = React.useState<LoginData>({ nickname: '', password: '' });

    return (
        <Paper >
            <Typography variant="h5" component="h3">
                Welcome to Social Chat
            </Typography>
            <Typography component="p">
                Register or login to start chatting...
            </Typography>

            <Grid container justify="center" spacing={4} >

                <Grid item xs={4}>
                    <Paper>
                        <form id="form-register">
                            <TextField
                                required
                                id="standard-required"
                                label="Nickname"
                                margin="normal"
                                onChange={(ev) => {
                                    setRegistedData(
                                        { ...registerData, nickname: ev.target.value.trim() }
                                    )
                                }}
                            />

                            <br />

                            <TextField
                                label="E-mail (Optional)"
                                margin="normal"
                                onChange={(ev) => {
                                    setRegistedData(
                                        { ...registerData, email: ev.target.value.trim() })
                                }}
                            />

                            <br />

                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                onChange={(ev) => {
                                    setRegistedData(
                                        { ...registerData, password: ev.target.value.trim() })
                                }}

                            />

                            <br />

                            <TextField
                                id="standard-password-input"
                                label="Re-enter Password"
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                onChange={(ev) => {
                                    setRegistedData(
                                        { ...registerData, rePassowrd: ev.target.value.trim() })
                                }}
                            />

                            <br />

                            <Button variant="contained" color="primary" onClick={async (ev) => {

                                const response = await fetch("https://localhost:8000/register", {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                        // 'Content-Type': 'application/x-www-form-urlencoded',
                                    },
                                    mode: 'cors', // no-cors, *cors, same-origin
                                    body: JSON.stringify(registerData)
                                });
                                const json = await response.json();
                                props.setToken(json.token);
                                console.log(json);
                            }}>>
                                    Register
                            </Button>
                        </ form>
                    </Paper>

                </Grid>

                <Grid item xs={4}>
                    <Paper>
                        <form>
                            <TextField
                                required
                                id="standard-required"
                                label="Nickname"
                                margin="normal"
                                onChange={(ev) => {
                                    setLoginData(
                                        { ...loginData, nickname: ev.target.value.trim() })
                                }}
                            />

                            <br />

                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                onChange={(ev) => {
                                    setLoginData(
                                        { ...loginData, password: ev.target.value.trim() })
                                }}
                            />
                            <br />
                            <Button variant="contained" color="primary" onClick={async (ev) => {
                                console.log(JSON.stringify(loginData));
                                const response = await fetch("https://localhost:8000/login", {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                        // 'Content-Type': 'application/x-www-form-urlencoded',
                                    },
                                    mode: 'cors', // no-cors, *cors, same-origin
                                    body: JSON.stringify(loginData)
                                });
                                const json = await response.json();
                                props.setToken(json.token);
                                props.setCurrentUser(json.token);
                                console.log(json);
                            }}>
                                Login
                            </Button>
                        </form>
                    </Paper>
                </Grid>

            </Grid>

        </Paper>)
}

const mapDispatchToProps = (dispatch : any) => ({
    setCurrentUser: (user: any) => dispatch(setCurrentUser(user)),
    setToken: (token: string) => dispatch(setToken(token))
});

const mapStateToProps = (state: any) => ({
    currentUser: state,
    token: state.user.token
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);