import axios from "axios";

const userInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "aa93dd2b-0879-446a-9c9d-782f018d24e5"}
})

export const usersAPI = {
    async getUsers(currentPage, pageSize) {
        const response = await userInstance.get(`users?count=${pageSize}&page=${currentPage}`);
        return response.data;
    },                               
}

export const followAPI = {
    deleteUser(userId) {
        return userInstance.delete(`follow/${userId}`)
                           .then(response => response.data)
    },

    postUser(userId) {
        return userInstance.post(`follow/${userId}`, {})
                           .then(response => response.data)
    }
}

export const profileAPI = {
    getProfile(userId) {
        userId = userId || 23437;
        return userInstance.get(`profile/${userId}`)
                           .then(response => response.data)
    },
    async getStatus(userId) {
        const response = await userInstance.get(`profile/status/${userId || 23437}`)
        return response.data
    },
    async updateStatus(statusData) {
        const response = await userInstance.put(`profile/status`, {status: statusData})
        return response
    }
}

export const authAPI = {
    setAuth() {
        return userInstance.get(`auth/me`)
    },

    login(email, password, rememberMe = false) {
        const data = {
            email: email,
            password: password,
            rememberMe: rememberMe,
            captcha: false
        }
        return userInstance.post(`/auth/login`, data)
    },

    logout() {
        return userInstance.delete(`/auth/login`)
    }
}
 