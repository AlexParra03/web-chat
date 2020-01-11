import ACTIONS from '../actions';

export default function setRooms(rooms: string[]) {
    return {
        type: ACTIONS.SET_ROOMS,
        payload: rooms
    }
}