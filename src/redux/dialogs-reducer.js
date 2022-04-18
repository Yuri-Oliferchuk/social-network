const ADD_MESSAGE = 'ADD_MESSAGE';

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
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: 
            let newMessage = {
                id: state.messages.length + 1, 
                message: action.text
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
                }

        default: return state;
    }
}

export const addMessage = (text) => ({type: ADD_MESSAGE, text})

export default dialogsReducer;