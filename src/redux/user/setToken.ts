import ACTIONS from '../actions';

export default function setToken(token: string) {
    return {
        type: ACTIONS.SET_TOKEN,
        payload: token
    }
}