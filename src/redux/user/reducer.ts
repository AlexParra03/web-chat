import ACTIONS from '../actions';



const INITIAL_STATE = {
    currentUser: null,
    token: null,
    rooms: null,
};

const userReducer = (state = INITIAL_STATE, action : {type: string, payload: any}) => {
    switch (action.type) {
        case ACTIONS.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case ACTIONS.SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case ACTIONS.SET_ROOMS:
            return {
                ...state,
                rooms: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;