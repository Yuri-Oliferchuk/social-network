import { stopSubmit } from 'redux-form'
import { ResultCodesEnum, ResultCodesForCaptch } from '../api/api'
import { securityAPI } from '../api/securityAPI'
import { authAPI } from '../api/authAPI'
import { BaseThunkType, InferActionsTypes } from './redux-store'

let initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  captchaURL: null as string | null,
  isAuth: false,
  isFetching: false
}

const authReducer = (state = initialState, action: ActionTypes): InitialState => {
  switch (action.type) {
    case 'auth/SET_USER_DATA':
      return {
        ...state,
        ...action.data
      }

    case 'auth/GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        captchaURL: action.captchaURL
      }

    case 'auth/DELETE_CAPTCHA_URL':
      return {
        ...state,
        captchaURL: null
      }

    default:
      return state
  }
}

export const actions = {
  setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'auth/SET_USER_DATA',
    data: { id, email, login, isAuth }
  } as const),
  getCaptchaUrlSuccess: (captchaURL: string) => ({
    type: 'auth/GET_CAPTCHA_URL_SUCCESS',
    captchaURL
  } as const),
  deleteCaptchaURL: () => ({ type: 'auth/DELETE_CAPTCHA_URL'} as const),
}

export const setAuthorisation = ():BaseThunkType => async (dispatch) => {
  const response = await authAPI.setAuth()
  if (response.resultCode === ResultCodesEnum.Success) {
    let { id, login, email } = response.data
    dispatch(actions.setAuthUserData(id, email, login, true))
  }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string):BaseThunkType => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe, captcha)
  if (response.resultCode === ResultCodesForCaptch.Success) {
    dispatch(setAuthorisation())
    dispatch(actions.deleteCaptchaURL())
  } else {
    if (response.resultCode === ResultCodesForCaptch.CaptchaIsRequired) {
      dispatch(getCaptchaURL())
    }
    const message = response.messages.length > 0 ? response.messages[0] : 'Some error'
    dispatch(stopSubmit('login', { _error: message }))
  }
}

export const logout = ():BaseThunkType => async (dispatch) => {
  const response = await authAPI.logout()
  if (response.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false))
  }
}

export const getCaptchaURL = ():BaseThunkType => async (dispatch) => {
  const response = await securityAPI.getCaptcha()
  dispatch(actions.getCaptchaUrlSuccess(response.data.url))
}

export default authReducer

type InitialState = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>
