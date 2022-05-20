import { setAuthorisation } from "./auth-reducer";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action: ActionsTypes):InitialStateType => {
    switch(action.type) {
        case 'app-reducer/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        
        default: return state;
    }    
}

export const actions = {
    initializedSuccess: () => ({type: 'app-reducer/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = ():BaseThunkType => async (dispatch) => {
    await dispatch(setAuthorisation())
    dispatch(actions.initializedSuccess())
}

export default appReducer;

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>