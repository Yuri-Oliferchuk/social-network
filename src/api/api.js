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
    async deleteUser(userId) {
        const response = await userInstance.delete(`follow/${userId}`);
        return response.data;
    },

    async postUser(userId) {
        const response = await userInstance.post(`follow/${userId}`, {});
        return response.data;
    }
}

export const profileAPI = {
    async getProfile(userId) {
        const response = await userInstance.get(`profile/${userId}`);
        return response.data;
    },
    async getStatus(userId) {
        const response = await userInstance.get(`profile/status/${userId || 23437}`)
        return response.data
    },
    async updateStatus(statusData) {
        const response = await userInstance.put(`profile/status`, {status: statusData})
        return response
    },
    async updateData(userData) {
        const response = await userInstance.put(`/profile`, userData)
        return response
    },
    async savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        const response = await userInstance.post(`/profile/photo`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        return response
    }
}

export const authAPI = {
    async setAuth() {
        return await userInstance.get(`auth/me`)
    },

    async login(email, password, rememberMe = false) {
        const data = {
            email: email,
            password: password,
            rememberMe: rememberMe,
            captcha: false
        }
        return await userInstance.post(`/auth/login`, data)
    },

    async logout() {
        return await userInstance.delete(`/auth/login`)
    }
}
 