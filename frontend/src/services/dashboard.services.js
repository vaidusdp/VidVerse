import api from "../api/axios";

const dashboardServices = {
    async getChannelStats() {
        const response = await api.get("/dashboard/channel-stats");
        return response;
    },

    async getChannelVideos() {
        const response = await api.get("/dashboard/channel-videos");
        return response;
    }
}

export default dashboardServices;