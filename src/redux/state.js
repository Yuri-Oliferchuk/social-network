const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';

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
        }    
    },

    _callSubscriber() {},

    getState() {
        return this._state
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        if(action.type === ADD_POST) {
            const postMessage = this._state.profilePage.newPostText;
            let newPost = {
                id: this._state.profilePage.posts.length + 1, 
                message: postMessage, 
                likesCount: 0
            }
            this._state.profilePage.posts = [newPost, ...this._state.profilePage.posts];
            this._state.profilePage.newPostText = '';
            this._callSubscriber();
        } else if(action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.text;
            this._callSubscriber()
        } else if(action.type === ADD_MESSAGE) {
            const postMessage = this._state.dialogsPage.newMessageBody;
            let newMessage = {
                id: this._state.dialogsPage.messages.length + 1, 
                message: postMessage
            }
            this._state.dialogsPage.messages = [...this._state.dialogsPage.messages, newMessage];
            this._state.dialogsPage.newMessageBody = '';
            this._callSubscriber();
        } else if(action.type === UPDATE_NEW_MESSAGE_BODY) {
            this._state.dialogsPage.newMessageBody = action.text;
            this._callSubscriber();
        }
    },
}

export const addPostActionCreator = () => ({type: ADD_POST})
export const onPostChangeActionCreator = (text) => 
        ({type: UPDATE_NEW_POST_TEXT, text: text})
export const addMessageCreator = () => ({type: ADD_MESSAGE})
export const updateNewMessageCreator = (text) => 
        ({type: UPDATE_NEW_MESSAGE_BODY, text: text})

export default store;
window.store = store;