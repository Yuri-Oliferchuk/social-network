import { stopSubmit } from 'redux-form'
import { profileAPI } from '../api/profileAPI'
import { PhotosType, Post, ProfileType } from '../types/types'
import { BaseThunkType, InferActionsTypes } from './redux-store'

let initialState = {
  posts: [
    { id: 1, message: 'My first post', likesCount: 20 },
    { id: 2, message: 'Hello', likesCount: 9 },
    { id: 3, message: 'WTF?', likesCount: 12 },
    { id: 4, message: 'It`s a live', likesCount: 43 },
    { id: 5, message: 'o_O', likesCount: 100 },
    { id: 6, message: 'Hi all!', likesCount: 1 }
  ] as Array<Post>,
  profile: null as ProfileType | null,
  status: ''
}

const profileReducer = (state = initialState, action: ActionTypes): InitialState => {
  switch (action.type) {
    case 'profile/ADD_POST':
      let newPost: Post = {
        id: state.posts.length + 1,
        message: action.post,
        likesCount: 0
      }
      return {
        ...state,
        posts: [newPost, ...state.posts]
      }

    case 'profile/DELETE_POST':
      return {
        ...state,
        posts: [...state.posts.filter((p) => p.id !== action.postId)]
      }

    case 'profile/SAVE_PHOTOS_SUCCESS':
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType
      }

    case 'profile/SET_USER_PROFILE':
      return {
        ...state,
        profile: action.profile
      }

    case 'profile/SET_USER_STATUS':
      return {
        ...state,
        status: action.data
      }

    default:
      return state
  }
}

export const actions = {
  addPost: (post: string) => ({ type: 'profile/ADD_POST', post } as const),
  deletePost: (postId: number) => ({ type: 'profile/DELETE_POST', postId } as const),
  setUserProfile: (profile: ProfileType) => ({ type: 'profile/SET_USER_PROFILE', profile } as const),
  setUserStatus: (data: string) => ({ type: 'profile/SET_USER_STATUS', data } as const),
  savePhotoSuccess: (photos: PhotosType) => ({ type: 'profile/SAVE_PHOTOS_SUCCESS', photos } as const),
}

export const getUserProfile = (userId: number): BaseThunkType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId)
  dispatch(actions.setUserProfile(data))
}

export const getUserStatus = (userId: number): BaseThunkType => async (dispatch) => {
  const data = await profileAPI.getStatus(userId)
  dispatch(actions.setUserStatus(data))
}

export const updateUserStatus = (status: string): BaseThunkType => async (dispatch) => {
  const response = await profileAPI.updateStatus(status)
  if (response.data.resultCode === 0) {
    dispatch(actions.setUserStatus(status))
  }
}

export const savePhoto = (file: File): BaseThunkType => async (dispatch) => {
  const response = await profileAPI.savePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(response.data.data.photos))
  }
}

export const putData = (data: ProfileType): BaseThunkType => async (dispatch, getState) => {
  const response = await profileAPI.updateData(data)
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(getState().auth.id))
  } else {
    const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
    dispatch(stopSubmit('profileData', { _error: message }))
    return Promise.reject(response.data.messages[0])
  }
}

export default profileReducer

type InitialState = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>
