import { followAPI, usersAPI } from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT = 'SET_CURRENT';
const SET_USERS_COUNT = 'SET_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRES = 'TOGGLE_IS_FOLLOWING_PROGRES';


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
                users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        
        case SET_USERS:
            return {
                ...state,
                // users: [...state.users, ...action.users]
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

export const requestUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleFetching());
        dispatch(setCurrentPage(currentPage));
        usersAPI.getUsers(currentPage, pageSize)
        .then(data => {
            dispatch(toggleFetching());
            dispatch(setUsers(data.items));
            if (data.totalCount > 100) data.totalCount = 100
            dispatch(setUsersCount(data.totalCount));
        })}
}

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowing(true, userId));
        followAPI.deleteUser(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(unfollowSuccees(userId))
                }
                dispatch(toggleFollowing(false, userId));      
            })
    }
}

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowing(true, userId));
        followAPI.postUser(userId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(followSuccees(userId))
            }
            dispatch(toggleFollowing(false, userId));        
        })
    }
}

export default usersReducer;