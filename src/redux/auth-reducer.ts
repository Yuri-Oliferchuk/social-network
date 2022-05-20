import { stopSubmit } from "redux-form"
import { authAPI, securityAPI } from "../api/api"

const SET_USER_DATA = "auth/SET_USER_DATA"
const GET_CAPTCHA_URL_SUCCESS = "auth/GET_CAPTCHA_URL_SUCCESS"
const DELETE_CAPTCHA_URL = "auth/DELETE_CAPTCHA_URL"

let initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  captchaURL: null as string | null,
  isAuth: false,
  isFetching: false
}

export type InitialState = typeof initialState

const authReducer = (state = initialState, action: any): InitialState => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data
      }

    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        captchaURL: action.captchaURL
      }

    case DELETE_CAPTCHA_URL:
      return {
        ...state,
        captchaURL: null
      }

    default:
      return state
  }
}

type SetAuthUserDataPayloadType = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: boolean | null
}
type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA
  data: SetAuthUserDataPayloadType
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({ type: SET_USER_DATA, data: { id, email, login, isAuth } })

type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS
  captchaURL: string
}
export const getCaptchaUrlSuccess = (captchaURL: string): GetCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  captchaURL
})

type DeleteCaptchaURL = {
  type: typeof DELETE_CAPTCHA_URL
}
export const deleteCaptchaURL = (): DeleteCaptchaURL => ({ type: DELETE_CAPTCHA_URL })

export const setAuthorisation = () => async (dispatch: any) => {
  const response = await authAPI.setAuth()
  if (response.data.resultCode === 0) {
    let { id, login, email } = response.data.data
    dispatch(setAuthUserData(id, email, login, true))
  }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha:string) => async (dispatch: any) => {
  const response = await authAPI.login(email, password, rememberMe, captcha)
  if (response.data.resultCode === 0) {
    dispatch(setAuthorisation())
    dispatch(deleteCaptchaURL())
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaURL())
    }
    const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
    dispatch(stopSubmit("login", { _error: message }))
  }
}

export const logout = () => async (dispatch: any) => {
  const response = await authAPI.logout()
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}

export const getCaptchaURL = () => async (dispatch: any) => {
  const response = await securityAPI.getCaptcha()
  dispatch(getCaptchaUrlSuccess(response.data.url))
}

export default authReducer
