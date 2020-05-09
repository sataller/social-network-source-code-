import * as axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {"API-KEY": "09237f73-efd4-4bff-b0ba-2a8987601863"},
});

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        let response = await instance.get(`users?page=${currentPage}&count=${pageSize}`,)
        return response.data
    },
    async unfollowUser(id) {
        let response = await instance.delete(`follow/${id}`)
        return response.data
    },
    async followUser(id) {
        let response = await instance.post(`follow/${id}`)
        return response.data
    },
    async getFollowingStatus(id) {
        let response = await instance.get(`follow/${id}`)
        return response
    },
    setUsers: (id) => {
        console.warn("Obsolete method. Pleas profileAPI object method")
        return profileAPI.setUsers(id)
    }
}

export const authAPI = {
    async me() {
        let response = await instance.get(`auth/me`)
        return response.data

    },
    async login(email, password, rememberMe = false, captcha = null) {
        let response = await instance.post(`/auth/login`, {email, password, rememberMe, captcha})

        return response.data

    },
    async logout() {
        let response = await instance.delete(`/auth/login`)
        return response.data
    }
}

export const securityAPI = {
    getCaptchaURL() {
        return instance.get(`security/get-captcha-url`)

    }
}

export const profileAPI = {
    setUsers: (id) => {
        return instance.get(`profile/` + id)
    },
    getStatus: (id) => {
        return instance.get(`profile/status/` + id)
    },

    updateStatus: (status) => {
        return instance.put(`profile/status`, {status: status})
    },

    savePhoto: (photoFile) => {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
}

export const dialogsAPI = {
    async startChatting(userId) {
        const response = await instance.put(`dialogs/${userId}`)
        return response
    },
    async getDialogs() {
        const response = await instance.get(`dialogs/`)
        return response
    },

    async getMassagesList(userId, count, pageNumber) {
        const response = await instance.get(`dialogs/${userId}/messages?count=${count}&page=${pageNumber}`)
        return response
    },

    async sendMessage(userId, body) {
        const response = await instance.post(`dialogs/${userId}/messages`, {body: body})
        return response
    },

    async viewedMessage(messageId) {
        const response = await instance.get(`dialogs/messages/${messageId}/viewed`)
        return response
    },

    async addMassageToSpam(messageId) {
        const response = await instance.post(`dialogs/messages/${messageId}/spam`)
        return response
    },

    async deleteMessageForMe(messageId) {
        const response = await instance.delete(`dialogs/messages/${messageId}`)
        return response
    },

    async restoreMessage(messageId) {
        const response = await instance.put(`dialogs/messages/${messageId}/restore`)
        return response
    },
    async returnMessage(userId, date) {
        const response = await instance.get(`dialogs/${userId}/messages/new?newerThen=${date}`)
        return response
    },

    async getNewMessages() {
        const response = await instance.get(`dialogs/messages/new/count`)
        return response
    }


}

export const toDoListAPI = {

    async getAllLists() {
        const response = await instance.get(`todo-lists/`)
        return response
    },
    async createNewList(title) {
        const response = await instance.post(`todo-lists/`, title)
        return response.data.item
    },
    async deleteList(todolistId) {
        const response = await instance.delete(`todo-lists/${todolistId}`)
        return response
    },
    async updateList(todolistId, title) {
        const response = await instance.put(`todo-lists/${todolistId}`, title)
        return response
    },
    async reorderList(todolistId, putAfterItemId) {
        const response = await instance.put(`todo-lists/${todolistId}/reorder`, putAfterItemId)
        return response
    },
    async getPortionTasksForList(todolistId, count, page) {
        const response = await instance.get(`todo-lists/${todolistId}/tasks?count=${count}&page=${page}`)
        return response
    },
    async createNewTaskForList(todolistId) {
        const response = await instance.post(`todo-lists/${todolistId}/tasks`)
        return response
    },
    async updateTasksForList(todolistId, taskId, title, description, completed, status,
                             priority, startDate, deadline) {
        const response = await instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, title, description, completed, status,
            priority, startDate, deadline)
        return response
    },
    async deleteTaskForList(todolistId, taskId) {
        const response = await instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
        return response
    },
    async changeTaskOrder(todolistId, taskId) {
        const response = await instance.put(`todo-lists/${todolistId}/tasks/${taskId}/reorder`)
        return response
    },
}

