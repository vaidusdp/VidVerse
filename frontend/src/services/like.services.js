import api from "../api/axios";

const likeServices = {
    async toggleVideoLike(videoId){
        const response = await api.post(`/likes/${videoId}/toggle-like`);
        return response.data;
    },
    
    async toggleCommentLike(commentId){
        const response = await api.post(`/likes/c/${commentId}/toggle-like`);
        return response.data;
    },

    async getLikedVideos() {
        const response = await api.get("/likes/me/liked-videos");
        return response.data;
    },
}

export default likeServices;