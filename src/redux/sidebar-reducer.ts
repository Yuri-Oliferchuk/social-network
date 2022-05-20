let initialState = {}
type InitialState = typeof initialState;

const sidebarReducer = (state = initialState, action: any): InitialState => {
    switch(action.type) {
        default: return state;
    }
}

export default sidebarReducer;