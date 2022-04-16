import axios from "axios";

const userInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "aa93dd2b-0879-446a-9c9d-782f018d24e5"}
})

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return userInstance.get(`users?count=${pageSize}&page=${currentPage}`)
               .then(response => response.data)
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
    }
}

export const authAPI = {
    setAuth() {
        return userInstance.get(`auth/me`)
    }  
}
 