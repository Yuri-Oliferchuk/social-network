import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';
const DELETE_CAPTCHA_URL = 'auth/DELETE_CAPTCHA_URL';

let initialState = {
    id: null,
    email: null,
    login: null,
    captchaURL: null,
    isAuth: false,
    isFetching: false,
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaURL: action.captchaURL,
            }

        case DELETE_CAPTCHA_URL:
            return {
                ...state,
                captchaURL: null,
            }
        
        default: return state;
    }    
}

export const setAuthUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA, data: {id, email, login, isAuth}})
export const getCaptchaUrlSuccess = (captchaURL) => ({type: GET_CAPTCHA_URL_SUCCESS, captchaURL})
export const deleteCaptchaURL = () => ({type: DELETE_CAPTCHA_URL})

export const setAuthorisation = () => async (dispatch) => {
        const response = await authAPI.setAuth();
        if (response.data.resultCode === 0) {
            let { id, login, email } = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            dispatch(setAuthorisation());
            dispatch(deleteCaptchaURL());
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaURL());
            }
            const message = response.data.messages.length > 0 
                            ? response.data.messages[0] 
                            : "Some error"
            dispatch(stopSubmit("login", {_error: message}))
        }
}

export const logout = () => async (dispatch) => {
    const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
}

export const getCaptchaURL = () => async (dispatch) => {
    const response = await securityAPI.getCaptcha()
        dispatch(getCaptchaUrlSuccess(response.data.url));
}

export default authReducer;