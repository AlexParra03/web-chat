import ACTIONS from '../actions';
import { ChatDialog } from '../../chat-app/ChatContainer';

const setChats = (room: string) => ({
    type: ACTIONS.REMOVE_CHAT,
    payload: {room},
});

export default setChats;