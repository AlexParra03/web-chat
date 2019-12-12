import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { blue, purple, green, orange } from '@material-ui/core/colors';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

import {Provider} from 'react-redux';
import store from './redux/store'

const theme : ThemeOptions = createMuiTheme({
    palette: {
        primary: green,
        secondary: blue,
        error: orange,
    },
});

ReactDOM.render(
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </Provider>
                , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
