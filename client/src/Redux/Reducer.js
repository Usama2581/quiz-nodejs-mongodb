// const initialState = usama
function userReducer ( state = {}, action) {
    
    switch(action.type) {
        case 'USER_DATA':
            return {
                user: action.payload
            }
            default: return state
    }
}

export default userReducer

