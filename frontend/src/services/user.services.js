import api from "../api/axios";

const userServices = {
    async updateDetails(details){
        const response = await api.patch("/users/update-details", details);
        return response.data;
    },

    async updateAvatar(formData){
        const response = await api.patch("/users/update-avatar",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )

        return response.data;
    },

    async updateCoverImage(formData){
        const response = await api.patch("/users/update-cover-image",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )

        return response.data;
    },

    async changePassword(data){
        const response = await api.post("/users/change-password", data);
        return response.data;
    },

    async channelProfile(username){
        const response = await api.get(`/users/channels/${username}`);
        return response.data;
    },

    async getHistory(){
        const response = await api.get("/users/user-watch-history");
        return response.data;
    }
}

export default userServices;