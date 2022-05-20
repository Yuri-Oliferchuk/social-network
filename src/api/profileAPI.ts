import { PhotosType, ProfileType } from '../types/types'
import { userInstance, ResultCodesEnum } from './api'

export type PhotoResponseType = {
  data: {
    photos: PhotosType
  }
  resultCode: ResultCodesEnum
  messages: string
  fieldsErrors: string
}
export type StatusResponseType = {
  data: {}
  resultCode: ResultCodesEnum
  messages: string
}

export const profileAPI = {
  async getProfile(userId: number) {
    const response = await userInstance.get<ProfileType>(`profile/${userId}`)
    return response.data
  },
  async getStatus(userId: number) {
    const response = await userInstance.get<string>(`profile/status/${userId || 23437}`)
    return response.data
  },
  async updateStatus(statusData: string) {
    const response = await userInstance.put<StatusResponseType>(`profile/status`, { status: statusData })
    return response
  },
  async updateData(userData: ProfileType) {
    const response = await userInstance.put<StatusResponseType>(`/profile`, userData)
    return response
  },
  async savePhoto(photoFile: File) {
    const formData = new FormData()
    formData.append('image', photoFile)
    const response = await userInstance.post<PhotoResponseType>(`/profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  }
}
