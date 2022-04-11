const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

const profileReducer = (state, action) => {
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