import ACTIONS from '../actions';

const setCurrentUser = (user: any) => ({
    type: ACTIONS.SET_CURRENT_USER,
    payload: user,
});

export default setCurrentUser;