

const initialState = {
    loggedIn: false,
}


const authReducer = (state = initialState, action) => {
    switch(action.type){
        case 'set_login':
            return {...state,  loggedIn: action.payload};
        default:
            return state;
    }
}

export default authReducer;
