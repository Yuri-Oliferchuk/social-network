const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';

const dialogsReducer = (state, action) => {
    switch (action.type) {
        case ADD_MESSAGE: 
            const postMessage = state.newMessageBody;
            let newMessage = {
                id: state.messages.length + 1, 
                message: postMessage
            }
            state.messages = [...state.messages, newMessage];
            state.newMessageBody = '';
            return state;
        case UPDATE_NEW_MESSAGE_BODY: 
            state.newMessageBody = action.text;
            return state;
        default: return state;
    }
}

export const addMessageCreator = () => ({type: ADD_MESSAGE})
export const updateNewMessageCreator = (text) => 
        ({type: UPDATE_NEW_MESSAGE_BODY, text: text})

export default dialogsReducer;