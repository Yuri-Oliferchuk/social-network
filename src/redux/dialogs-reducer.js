const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';

let initialState = {
    dialogs: [
        {id: 1, name:'Yura'},
        {id: 2, name:'Lena'},
        {id: 3, name:'Alisa'},
        {id: 4, name:'Andrey'},
        {id: 5, name:'Guest'},
        {id: 6, name:'Vova'}
    ],
    messages: [
        {id: 1, message:'Hi'},
        {id: 2, message:'How are you'},
        {id: 3, message:'WTF?'}
    ],
    newMessageBody: '',
}

const dialogsReducer = (state = initialState, action) => {
    let stateCopy = {...state}
    switch (action.type) {
        case ADD_MESSAGE: 
            const postMessage = state.newMessageBody;
            let newMessage = {
                id: state.messages.length + 1, 
                message: postMessage
            }
            stateCopy.messages = [...state.messages, newMessage];
            stateCopy.newMessageBody = '';
            return stateCopy;
        case UPDATE_NEW_MESSAGE_BODY: 
            stateCopy.newMessageBody = action.text;
            return stateCopy;
        default: return state;
    }
}

export const addMessageCreator = () => ({type: ADD_MESSAGE})
export const updateNewMessageCreator = (text) => 
        ({type: UPDATE_NEW_MESSAGE_BODY, text: text})

export default dialogsReducer;