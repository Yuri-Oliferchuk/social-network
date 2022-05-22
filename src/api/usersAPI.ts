import { FilterType } from '../redux/users-reducer'
import { UserType } from '../types/types'
import { userInstance } from './api'


export type UserResponseType = {
  items: Array<UserType>
  totalCount: number
  error: string
}

export const usersAPI = {
  async getUsers(currentPage: number, pageSize: number, term: string = '', friend: boolean | null = null) {
    const response = await userInstance.get<UserResponseType>(`users?count=${pageSize}&page=${currentPage}&term=${term}` + (friend===null? '' : `&friend=${friend}`))
    return response.data
  }
}
