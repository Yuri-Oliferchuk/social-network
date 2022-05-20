import axios from 'axios'

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}
export enum ResultCodesForCaptch {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10
}
export const userInstance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { 'API-KEY': 'aa93dd2b-0879-446a-9c9d-782f018d24e5' }
})


