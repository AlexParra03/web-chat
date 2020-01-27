import ACTIONS from '../actions';
import {ChatDialog} from '../../chat-app/ChatContainer';


interface InitialState {
    currentUser: string | null,
    token: string | null,
    rooms: string[] | null,
    chats: {[room: string] : ChatDialog[]}
}

const INITIAL_STATE : InitialState = {
    currentUser: null,
    token: null,
    rooms: null,
    chats: {}
};

const userReducer = (state = INITIAL_STATE, action : {type: string, payload: any}) => {
    // creating a new state, deep cloning all the fields
    const object : InitialState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case ACTIONS.SET_CURRENT_USER:
            return {
                ...object,
                currentUser: action.payload
            }
        case ACTIONS.SET_TOKEN:
            return {
                ...object,
                token: action.payload
            }
        case ACTIONS.SET_ROOMS:
            return {
                ...object,
                rooms: action.payload
            }
        case ACTIONS.ADD_CHAT:
            if(action.payload.room in state.chats) {
                object.chats[action.payload.room] = [...state.chats[action.payload.room], action.payload.chatMessage ]
                return object;
            } else {
                object.chats[action.payload.room] = [ action.payload.chatMessage ]
                return object;
            }
        case ACTIONS.REMOVE_CHAT:
            if(action.payload.room in object.chats) {
                delete object.chats[action.payload.room];
            }
            return object;

        default:
            return state;
    }
}

export default userReducer;