import { followAPI, usersAPI } from "../api/api"
import { UserType } from "../types/types"
import { updateObjectInArray } from "../utils/helper/object-helper"

const FOLLOW = "users/FOLLOW"
const UNFOLLOW = "users/UNFOLLOW"
const SET_USERS = "users/SET_USERS"
const SET_CURRENT = "users/SET_CURRENT"
const SET_USERS_COUNT = "users/SET_USERS_COUNT"
const TOGGLE_IS_FETCHING = "users/TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRES = "users/TOGGLE_IS_FOLLOWING_PROGRES"

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 4,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgres: [] as Array<number>
}

type InitialState = typeof initialState

const usersReducer = (state = initialState, action: any): InitialState => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
      }

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
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
        followingInProgres: action.isFetching ? [...state.followingInProgres, action.userId] : state.followingInProgres.filter((id) => id !== action.userId)
      }

    default:
      return state
  }
}

type FollowSucceesType = {
  type: typeof FOLLOW
  userId: number
}
type UnfollowSuccees = {
  type: typeof UNFOLLOW
  userId: number
}
type SetUsers = {
  type: typeof SET_USERS
  users: Array<UserType>
}
type SetCurrentPage = {
  type: typeof SET_CURRENT
  currentPage: number
}
type SetUsersCount = {
  type: typeof SET_USERS_COUNT
  usersCount: number
}
type ToggleFetching = {
  type: typeof TOGGLE_IS_FETCHING
}
type ToggleFollowing = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRES
    isFetching: boolean
    userId: number
}

export const followSuccees = (userId: number): FollowSucceesType => ({ type: FOLLOW, userId })
export const unfollowSuccees = (userId: number): UnfollowSuccees => ({ type: UNFOLLOW, userId })
export const setUsers = (users: Array<UserType>): SetUsers => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage: number): SetCurrentPage => ({ type: SET_CURRENT, currentPage })
export const setUsersCount = (usersCount: number): SetUsersCount => ({ type: SET_USERS_COUNT, usersCount })
export const toggleFetching = (): ToggleFetching => ({ type: TOGGLE_IS_FETCHING })
export const toggleFollowing = (isFetching: boolean, userId: number): ToggleFollowing => ({ type: TOGGLE_IS_FOLLOWING_PROGRES, isFetching, userId })

export const requestUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
  dispatch(toggleFetching())
  dispatch(setCurrentPage(currentPage))
  const data = await usersAPI.getUsers(currentPage, pageSize)
  dispatch(toggleFetching())
  dispatch(setUsers(data.items))

  // if (data.totalCount > 100) data.totalCount = 100;
  dispatch(setUsersCount(data.totalCount))
}

export const unfollow = (userId: number) => async (dispatch: any) => {
  dispatch(toggleFollowing(true, userId))
  const data = await followAPI.deleteUser(userId)
  if (data.resultCode === 0) {
    dispatch(unfollowSuccees(userId))
  }
  dispatch(toggleFollowing(false, userId))
}

export const follow = (userId: number) => async (dispatch: any) => {
  dispatch(toggleFollowing(true, userId))
  const data = await followAPI.postUser(userId)
  if (data.resultCode === 0) {
    dispatch(followSuccees(userId))
  }
  dispatch(toggleFollowing(false, userId))
}

export default usersReducer
