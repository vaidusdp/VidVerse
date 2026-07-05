import api from "../api/axios";

const commentServices = {
    async publishComment(videoId, content){
        const response = await api.post(`/comments/${videoId}/publish-comment`, content);
        return response.data;
    },

    async getVideoComments(videoId){
        const response = await api.get(`/comments/${videoId}/get-comments`);
        return response.data;
    },

    async updateComment(commentId, content){
        const response = await api.patch(`/comments/update-comment/${commentId}`, content);
        return response.data;
    },

    async deleteComment(commentId){
        const response = await api.delete(`/comments/delete-comment/${commentId}`);
        return response.data;
    },
}

export default commentServices;