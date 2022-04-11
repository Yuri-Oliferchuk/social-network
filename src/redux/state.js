import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

const store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message:'My first post', likesCount: 20},
                {id: 2, message:'Hello', likesCount: 9},
                {id: 3, message:'WTF?', likesCount: 12},
                {id: 4, message:'It`s a live', likesCount: 43},
                {id: 5, message:'o_O', likesCount: 100},
                {id: 6, message:'Hi all!', likesCount: 1}
            ],
            newPostText: '',
        },
        dialogsPage: {
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
        },
        sidebar: {},
    },

    _callSubscriber() {},

    getState() {
        return this._state
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber();
    },
}

export default store;
window.store = store;