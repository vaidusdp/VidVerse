import api from "../api/axios";

const subscribeService = {
    async toggleSubscribe(channelId){
        const response = await api.post(`/subscription/channels/${channelId}`);
        return response.data;
    },

    async getSubscribedChannel(userId){
        const response = await api.get(`/subscription/users/${userId}`);
        return response.data;
    },

    async getSubscribers(channelId){
        const response = await api.get(`/subscription/channels/${channelId}/subscribers`);
        return response.data;
    }
}

export default subscribeService;