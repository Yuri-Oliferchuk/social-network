import { followAPI } from '../api/followAPI'
import { usersAPI } from '../api/usersAPI'
import { UserType } from '../types/types'
import { updateObjectInArray } from '../utils/helper/object-helper'
import { BaseThunkType, InferActionsTypes } from './redux-store'

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 4,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgres: [] as Array<number>,
  filter: {
    term: '',
    friend: null as null | boolean,
  }
}

const usersReducer = (state = initialState, action: ActionTypes): InitialState => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
      }

    case 'UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
      }

    case 'SET_USERS':
      return {
        ...state,
        users: [...action.users]
      }

    case 'SET_CURRENT':
      return {
        ...state,
        currentPage: action.currentPage
      }

    case 'SET_USERS_COUNT':
      return {
        ...state,
        totalUsersCount: action.usersCount
      }

    case 'TOGGLE_IS_FETCHING':
      return {
        ...state,
        isFetching: state.isFetching ? false : true
      }

    case 'TOGGLE_IS_FOLLOWING_PROGRES':
      return {
        ...state,
        followingInProgres: action.isFetching ? [...state.followingInProgres, action.userId] : state.followingInProgres.filter((id) => id !== action.userId)
      }
    
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      }

    default:
      return state
  }
}

export const actions = {
  followSuccees: (userId: number) => ({ type: 'FOLLOW', userId } as const),
  unfollowSuccees: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
  setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
  setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT', currentPage } as const),
  setFilter: (filter: FilterType) => ({ type: 'SET_FILTER', payload: filter } as const),
  setUsersCount: (usersCount: number) => ({ type: 'SET_USERS_COUNT', usersCount } as const),
  toggleFetching: () => ({ type: 'TOGGLE_IS_FETCHING' } as const),
  toggleFollowing: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRES', isFetching, userId } as const)
}

export const requestUsers =
  (currentPage: number, pageSize: number, filter: FilterType): BaseThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleFetching())
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.setFilter(filter))
    const data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
    dispatch(actions.toggleFetching())
    dispatch(actions.setUsers(data.items))

    // if (data.totalCount > 100) data.totalCount = 100;
    dispatch(actions.setUsersCount(data.totalCount))
  }

export const unfollow =
  (userId: number): BaseThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleFollowing(true, userId))
    const data = await followAPI.deleteUser(userId)
    if (data.resultCode === 0) {
      dispatch(actions.unfollowSuccees(userId))
    }
    dispatch(actions.toggleFollowing(false, userId))
  }

export const follow =
  (userId: number): BaseThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleFollowing(true, userId))
    const data = await followAPI.postUser(userId)
    if (data.resultCode === 0) {
      dispatch(actions.followSuccees(userId))
    }
    dispatch(actions.toggleFollowing(false, userId))
  }

export default usersReducer

export type InitialState = typeof initialState
export type FilterType = typeof initialState.filter
type ActionTypes = InferActionsTypes<typeof actions>