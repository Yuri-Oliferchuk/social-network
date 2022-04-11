let rerenderTree = () => {}

let state = {
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
}


window.state = state;

export const addPost = () => {
    const postMessage = state.profilePage.newPostText;
    let newPost = {
        id: state.profilePage.posts.length + 1, 
        message: postMessage, 
        likesCount: 0
    }
    state.profilePage.posts = [newPost, ...state.profilePage.posts];
    state.profilePage.newPostText = '';
    rerenderTree(state)
}

export const updateNewPostText = (text) => {
    state.profilePage.newPostText = text;
    rerenderTree(state)
}

export const addMessage = () => {
    const postMessage = state.dialogsPage.newPostMessage;
    let newMessage = {
        id: state.dialogsPage.messages.length + 1, 
        message: postMessage
    }
    state.dialogsPage.messages.push(newMessage);
    state.dialogsPage.newPostMessage = '';
    rerenderTree(state)
}

export const updateNewPostMessage = (text) => {
    state.dialogsPage.newPostMessage = text;
    rerenderTree(state)
}

export const subscribe = (observer) => {
    rerenderTree = observer;
}

export default state;