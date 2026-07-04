import api from "../api/axios";

const authServices = {
  async register(formData) {
    const response = await api.post("/users/register-user", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  async login(credentials) {
    const response = await api.post("/users/login-user", credentials);
    return response.data;
  },

  async logout() {
    const response = await api.post("/users/logout-user");
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get("/users/current-user");
    return response.data;
  },
};

export default authServices;