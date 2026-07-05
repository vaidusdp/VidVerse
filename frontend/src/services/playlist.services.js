import api from "../api/axios";

const playlistService = {
    async createPlaylist(data){
        const response = await api.post("/playlists/create-playlist", data);
        return response.data;
    },
    
    async getPlaylist(playlistId){
        const response = await api.get(`/playlists/get-playlist/${playlistId}`);
        return response.data;
    },

    async updatePlaylist(playlistId, data){
        const response = await api.patch(`/playlists/update-playlist/${playlistId}`, data);
        return response.data;
    },

    async deletePlaylist(playlistId){
        const response = await api.delete(`/playlists/delete/${playlistId}`);
        return response.data;
    },

    async addVideoToPlaylist(playlistId, videoId){
        const response = await api.patch(`/playlists/add-video/p/${playlistId}/v/${videoId}`);
        return response.data;
    },

    async deleteVideoFromPlaylist(playlistId, videoId){
        const response = await api.delete(`/playlists/delete-video/p/${playlistId}/v/${videoId}`);
        return response.data;
    },

    async getUserPlaylists(userId){
        const response = await api.get(`/playlists/users/${userId}`)
        return response.data;
    }

}

export default playlistService;