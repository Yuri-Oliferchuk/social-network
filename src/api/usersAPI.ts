import { UserType } from '../types/types'
import { userInstance } from './api'


export type UserResponseType = {
  items: Array<UserType>
  totalCount: number
  error: string
}

export const usersAPI = {
  async getUsers(currentPage: any, pageSize: any) {
    const response = await userInstance.get<UserResponseType>(`users?count=${pageSize}&page=${currentPage}`)
    return response.data
  }
}
