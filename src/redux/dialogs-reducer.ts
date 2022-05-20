import { InferActionsTypes } from "./redux-store";

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

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'dialogs/ADD_MESSAGE': 
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

export const actions = {
    addMessage: (text: string) => ({type: 'dialogs/ADD_MESSAGE', text} as const)
}

export default dialogsReducer;

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
type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>