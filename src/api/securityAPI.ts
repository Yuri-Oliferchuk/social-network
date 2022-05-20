import { userInstance } from './api'

export type CapthcaResponseType = {
  url: string
}

export const securityAPI = {
  async getCaptcha() {
    return await userInstance.get<CapthcaResponseType>(`security/get-captcha-url`)
  }
}
