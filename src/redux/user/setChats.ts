import ACTIONS from '../actions';
import { ChatDialog } from '../../chat-app/ChatContainer';

const setChats = (room: string, chatMessage : ChatDialog) => ({
    type: ACTIONS.ADD_CHAT,
    payload: {
        room,
        chatMessage
    },
});

export default setChats;