const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

let initialState = {
    posts: [
        {id: 1, message:'My first post', likesCount: 20},
        {id: 2, message:'Hello', likesCount: 9},
        {id: 3, message:'WTF?', likesCount: 12},
        {id: 4, message:'It`s a live', likesCount: 43},
        {id: 5, message:'o_O', likesCount: 100},
        {id: 6, message:'Hi all!', likesCount: 1}
    ],
    newPostText: '',
}

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST: 
            const postMessage = state.newPostText;
            let newPost = {
                id: state.posts.length + 1, 
                message: postMessage, 
                likesCount: 0
            }
            state.newPostText = '';
            state.posts = [newPost, ...state.posts];
            return state;
        case UPDATE_NEW_POST_TEXT: 
            state.newPostText = action.text;
            return state;
        default: return state;
    }    
}

export const addPostActionCreator = () => ({type: ADD_POST})
export const onPostChangeActionCreator = (text) => 
        ({type: UPDATE_NEW_POST_TEXT, text: text})

export default profileReducer;