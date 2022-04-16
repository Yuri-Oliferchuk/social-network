import { profileAPI } from "../api/api";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

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
    profile: null,
}

const profileReducer = (state = initialState, action) => {
    switch(action.type) {

        case ADD_POST: 
            let newPost = {
                id: state.posts.length + 1, 
                message: state.newPostText, 
                likesCount: 0
            }
            return {
                ...state,
                posts: [newPost, ...state.posts],
                newPostText: ''
            }

        case UPDATE_NEW_POST_TEXT: 
            return {
                ...state,
                newPostText: action.text
            }

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        default: return state;
    }    
}

export const addPost = () => ({type: ADD_POST});
export const onPostChange = (text) => ({type: UPDATE_NEW_POST_TEXT, text});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

export const getUserProfile = (userId) => {
    return (dispatch) => {
        profileAPI.getProfile(userId)
            .then(data => {
                dispatch(setUserProfile(data));
            })
    }
}

export default profileReducer;