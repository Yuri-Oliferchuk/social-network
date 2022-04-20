import { followAPI, usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/helper/object-helper";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT = 'users/SET_CURRENT';
const SET_USERS_COUNT = 'users/SET_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRES = 'users/TOGGLE_IS_FOLLOWING_PROGRES';


let initialState = {
    users: [],
    pageSize: 4,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgres: [],
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true}),
            }
        
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false}),
            }
        
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }

        case SET_CURRENT:
            return {
                ...state,
                currentPage: action.currentPage
            }

        case SET_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.usersCount
            }
        
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: state.isFetching ? false : true
            }
        
        case TOGGLE_IS_FOLLOWING_PROGRES:
            return {
                ...state,
                followingInProgres: action.isFetching 
                        ? [...state.followingInProgres, action.userId]
                        : state.followingInProgres.filter(id => id !== action.userId)
            }

        default: return state;
    }    
}

export const followSuccees = (userId) => ({type: FOLLOW, userId})
export const unfollowSuccees = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT, currentPage})
export const setUsersCount = (usersCount) => ({type: SET_USERS_COUNT, usersCount})
export const toggleFetching = () => ({type: TOGGLE_IS_FETCHING})
export const toggleFollowing = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRES, isFetching, userId})

export const requestUsers = (currentPage, pageSize) => async (dispatch) => {
        dispatch(toggleFetching());
        dispatch(setCurrentPage(currentPage));
        const data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleFetching());
        dispatch(setUsers(data.items));

        // if (data.totalCount > 100) data.totalCount = 100;
        dispatch(setUsersCount(data.totalCount));
}

export const unfollow = (userId) => async (dispatch) => {
        dispatch(toggleFollowing(true, userId));
        const data = await followAPI.deleteUser(userId)
        if (data.resultCode === 0) {
            dispatch(unfollowSuccees(userId))
        }
        dispatch(toggleFollowing(false, userId));      
}

export const follow = (userId) => async (dispatch) => {
        dispatch(toggleFollowing(true, userId));
        const data = await followAPI.postUser(userId)
        if (data.resultCode === 0) {
            dispatch(followSuccees(userId))
        }
        dispatch(toggleFollowing(false, userId));        
}

export default usersReducer;