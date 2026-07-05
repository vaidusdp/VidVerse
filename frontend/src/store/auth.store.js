import { create } from "zustand";
import authServices from "../services/auth.services";

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    loading: true,
    
    register: async (userData) => {
        try {
            set({loading: true});
    
            const response = await authServices.register(userData);
    
            set({loading: false});
            return response;
        } catch (error) {
            set({loading: false});
            throw error;
        }
    },
    login: async (credentials) => {
        try {
            set({loading: true});
    
            await authServices.login(credentials);

            const response = await authServices.getCurrentUser();
    
            set({
                user: response.data,
                loading: false,
                isAuthenticated: true
            });
            return response;
        } catch (error) {
            set({
                user: null,
                loading: false,
                isAuthenticated: false
            });
            throw error;
        }
    },
    logout: async () => {
        try {
            set({loading: true});
    
            await authServices.logout();

            set({
                user: null,
                loading: false,
                isAuthenticated: false
            });
        } catch (error) {
            set({loading: false});
            throw error;
        }
    },
    checkAuth: async () => {
        try {
            set({loading: true});
    
            const response = await authServices.getCurrentUser();
    
            set({
                user: response.data,
                loading: false,
                isAuthenticated: true
            });
            return response;
        } catch (error) {
            set({
                user: null,
                loading: false,
                isAuthenticated: false
            });
        }
    },
    setUser: (user) => set({user})
}));

export default useAuthStore