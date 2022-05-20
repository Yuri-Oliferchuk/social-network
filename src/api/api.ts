import axios from "axios";
import { ProfileType, UserType, PhotosType } from "../types/types";


export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodesForCaptch {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

const userInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "aa93dd2b-0879-446a-9c9d-782f018d24e5"}
})

type UserResponseType = {
    items: Array<UserType>,
    totalCount: number,
    error: string
}
export const usersAPI = {
    async getUsers(currentPage: any, pageSize: any) {
        const response = await userInstance.get<UserResponseType>(`users?count=${pageSize}&page=${currentPage}`);
        return response.data;
    },                               
}

type FollowingResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: string
}
export const followAPI = {
    async deleteUser(userId: number) {
        const response = await userInstance.delete<FollowingResponseType>(`follow/${userId}`);
        return response.data;
    },

    async postUser(userId: number) {
        const response = await userInstance.post<FollowingResponseType>(`follow/${userId}`, {});
        return response.data;
    }
}

type StatusResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: string
}
type PhotoResponseType = {
    data: {
        photos: PhotosType
    }
    resultCode: ResultCodesEnum
    messages: string
    fieldsErrors: string
}
export const profileAPI = {
    async getProfile(userId: number) {
        const response = await userInstance.get<ProfileType>(`profile/${userId}`);
        return response.data;
    },
    async getStatus(userId: number) {
        const response = await userInstance.get<string>(`profile/status/${userId || 23437}`)
        return response.data
    },
    async updateStatus(statusData: string) {
        const response = await userInstance.put<StatusResponseType>(`profile/status`, {status: statusData})
        return response
    },
    async updateData(userData: ProfileType) {
        const response = await userInstance.put<StatusResponseType>(`/profile`, userData)
        return response
    },
    async savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        const response = await userInstance.post<PhotoResponseType>(`/profile/photo`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        return response
    }
}


type MyResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: string
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesForCaptch
    messages: string
}
type LogoutResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: string
}

export const authAPI = {
    async setAuth() {
        return await userInstance.get<MyResponseType>(`auth/me`).then(res => res.data)
    },

    async login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        const data = {
            email: email,
            password: password,
            rememberMe: rememberMe,
            captcha: captcha
        }
        return await userInstance.post<LoginResponseType>(`/auth/login`, data).then(res => res.data)
    },

    async logout() {
        return await userInstance.delete<LogoutResponseType>(`/auth/login`).then(res => res.data)
    },
}

type CapthcaResponseType = {
    url: string
}
export const securityAPI = {
    async getCaptcha() {
        return await userInstance.get<CapthcaResponseType>(`security/get-captcha-url`)
    }
}