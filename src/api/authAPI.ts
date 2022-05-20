import { ResultCodesEnum, ResultCodesForCaptch, userInstance } from './api'

export type MyResponseType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodesEnum
  messages: string
}
export type LoginResponseType = {
  data: {
    userId: number
  }
  resultCode: ResultCodesForCaptch
  messages: string
}
export type LogoutResponseType = {
  data: {}
  resultCode: ResultCodesEnum
  messages: string
}

export const authAPI = {
  async setAuth() {
    return await userInstance.get<MyResponseType>(`auth/me`).then((res) => res.data)
  },

  async login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
    const data = {
      email: email,
      password: password,
      rememberMe: rememberMe,
      captcha: captcha
    }
    return await userInstance.post<LoginResponseType>(`/auth/login`, data).then((res) => res.data)
  },

  async logout() {
    return await userInstance.delete<LogoutResponseType>(`/auth/login`).then((res) => res.data)
  }
}
