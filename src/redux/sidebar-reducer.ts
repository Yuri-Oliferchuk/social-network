import { InferActionsTypes } from "./redux-store";

let initialState = {}
type InitialState = typeof initialState;

type ActionTypes = InferActionsTypes<typeof actions>

const sidebarReducer = (state = initialState, action: ActionTypes): InitialState => {
    switch(action.type) {
        default: return state;
    }
}

export const actions = {
    
}

export default sidebarReducer;