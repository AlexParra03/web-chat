import ACTIONS from '../actions';
import { Chatroom } from '../../chat-app/LeftMenu';

const setChatroomList = (chatrooms: Chatroom[]) => ({
    type: ACTIONS.SET_CHATROOMS,
    payload: {
        chatrooms
    },
});

export default setChatroomList;