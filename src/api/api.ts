const axios = require('axios').default;

const userInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "aa93dd2b-0879-446a-9c9d-782f018d24e5"}
})

export const usersAPI = {
    async getUsers(currentPage: any, pageSize: any) {
        const response = await userInstance.get(`users?count=${pageSize}&page=${currentPage}`);
        return response.data;
    },                               
}

export const followAPI = {
    async deleteUser(userId: any) {
        const response = await userInstance.delete(`follow/${userId}`);
        return response.data;
    },

    async postUser(userId: any) {
        const response = await userInstance.post(`follow/${userId}`, {});
        return response.data;
    }
}

export const profileAPI = {
    async getProfile(userId: any) {
        const response = await userInstance.get(`profile/${userId}`);
        return response.data;
    },
    async getStatus(userId: any) {
        const response = await userInstance.get(`profile/status/${userId || 23437}`)
        return response.data
    },
    async updateStatus(statusData: any) {
        const response = await userInstance.put(`profile/status`, {status: statusData})
        return response
    },
    async updateData(userData: any) {
        const response = await userInstance.put(`/profile`, userData)
        return response
    },
    async savePhoto(photoFile: any) {
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

    async login(email: any, password: any, rememberMe: any = false, captcha: any = false) {
        const data = {
            email: email,
            password: password,
            rememberMe: rememberMe,
            captcha: captcha
        }
        return await userInstance.post(`/auth/login`, data)
    },

    async logout() {
        return await userInstance.delete(`/auth/login`)
    },
}
 
export const securityAPI = {
    async getCaptcha() {
        return await userInstance.get(`security/get-captcha-url`)
    }
}