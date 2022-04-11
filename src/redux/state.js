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
            newPostMessage: '',
        }    
    },

    _callSubscriber() {},

    getState() {
        return this._state
    },

    addPost() {
        const postMessage = this._state.profilePage.newPostText;
        let newPost = {
            id: this._state.profilePage.posts.length + 1, 
            message: postMessage, 
            likesCount: 0
        }
        this._state.profilePage.posts = [newPost, ...this._state.profilePage.posts];
        this._state.profilePage.newPostText = '';
        this._callSubscriber()
    },

    updateNewPostText(text) {
        this._state.profilePage.newPostText = text;
        this._callSubscriber()
    },

    addMessage() {
        const postMessage = this._state.dialogsPage.newPostMessage;
        let newMessage = {
            id: this._state.dialogsPage.messages.length + 1, 
            message: postMessage
        }
        this._state.dialogsPage.messages = [...this._state.dialogsPage.messages, newMessage];
        this._state.dialogsPage.newPostMessage = '';
        this._callSubscriber();
    },

    updateNewPostMessage(text) {
        this._state.dialogsPage.newPostMessage = text;
        this._callSubscriber();
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    }
}

export default store;
window.store = store;