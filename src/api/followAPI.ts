import { ResultCodesEnum, userInstance } from './api'

type FollowingResponseType = {
  data: {}
  resultCode: ResultCodesEnum
  messages: string
}
export const followAPI = {
  async deleteUser(userId: number) {
    const response = await userInstance.delete<FollowingResponseType>(`follow/${userId}`)
    return response.data
  },

  async postUser(userId: number) {
    const response = await userInstance.post<FollowingResponseType>(`follow/${userId}`, {})
    return response.data
  }
}
