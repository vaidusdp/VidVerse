import api from "../api/axios";

const videoServices = {
    async getAllVideos(params = {}){
        const response = await api.get("/videos", {
            params
        })
        return response.data;
    },

    async getVideoById(videoId){
        const response = await api.get(`/videos/${videoId}`);
        return response.data;
    },

    async getMyVideos(){
        const response = await api.get("/videos/my-videos");
        return response.data;
    },

    async getChannelVideos(channelId){
        const response = await api.get(`/videos/channels/${channelId}`);
        return response.data;
    },

    async publishVideo(formData){
        const response = await api.post("/videos/publish-video",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )

        return response.data;
    },

    async updateVideo(videoId, formData){
        const response = await api.patch(`/videos/update-video/${videoId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )

        return response.data;
    },

    async togglePublishStatus(videoId) {
    const response = await api.patch(
        `/videos/${videoId}/publish`
        );

        return response.data;
    },

    async deleteVideo(videoId) {
        const response = await api.delete(
        `/videos/delete/${videoId}`
        );

        return response.data;
    },
}

export default videoServices;