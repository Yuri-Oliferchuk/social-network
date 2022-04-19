import { profileAPI } from "../api/api";

const ADD_POST = 'profile/ADD_POST';
const DELETE_POST = 'profile/DELETE_POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';

let initialState = {
    posts: [
        {id: 1, message:'My first post', likesCount: 20},
        {id: 2, message:'Hello', likesCount: 9},
        {id: 3, message:'WTF?', likesCount: 12},
        {id: 4, message:'It`s a live', likesCount: 43},
        {id: 5, message:'o_O', likesCount: 100},
        {id: 6, message:'Hi all!', likesCount: 1}
    ],
    profile: null,
    status: '',
}

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST: 
            let newPost = {
                id: state.posts.length + 1, 
                message: action.post, 
                likesCount: 0
            }
            return {
                ...state,
                posts: [newPost, ...state.posts],
            }
        
        case DELETE_POST: 
            return {
                ...state,
                posts: [...state.posts.filter(p => p.id !== action.postId)],
            }

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.data
            }

        default: return state;
    }    
}

export const addPost = (post) => ({type: ADD_POST, post});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setUserStatus = (data) => ({type: SET_USER_STATUS, data})

export const getUserProfile = (userId) => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data));
}

export const getUserStatus = (userId) => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(data))
}

export const updateUserStatus = (status) => async (dispatch) =>{
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}

export default profileReducer;