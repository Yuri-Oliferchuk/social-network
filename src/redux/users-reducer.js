const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT = 'SET_CURRENT';
const SET_USERS_COUNT = 'SET_USERS_COUNT'

let initialState = {
    users: [],
    pageSize: 4,
    totalUsersCount: 0,
    currentPage: 1,
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

        default: return state;

    }    
}

export const followAC = (userId) => ({type: FOLLOW, userId})
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId})
export const setUsersAC = (users) => ({type: SET_USERS, users})
export const currentPageAC = (currentPage) => ({type: SET_CURRENT, currentPage})
export const usersCountAC = (usersCount) => ({type: SET_USERS_COUNT, usersCount})

export default usersReducer;