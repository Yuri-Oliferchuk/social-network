const ADD_MESSAGE = 'dialogs/ADD_MESSAGE';

type Dialog = {
    id: number
    name: string
}
type Messages = {
    id: number
    message: string
}
type NewMessage = {
    id: number 
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name:'Yura'},
        {id: 2, name:'Lena'},
        {id: 3, name:'Alisa'},
        {id: 4, name:'Andrey'},
        {id: 5, name:'Guest'},
        {id: 6, name:'Vova'}
    ] as Array<Dialog>,
    messages: [
        {id: 1, message:'Hi'},
        {id: 2, message:'How are you'},
        {id: 3, message:'WTF?'}
    ] as Array<Messages>
}

export type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE: 
            let newMessage: NewMessage = {
                id: state.messages.length + 1, 
                message: action.text,
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
                }

        default: return state;
    }
}

type addMessageActionType = {
    type: typeof ADD_MESSAGE
    text: string
}

export const addMessage = (text: string): addMessageActionType => ({type: ADD_MESSAGE, text})

export default dialogsReducer;