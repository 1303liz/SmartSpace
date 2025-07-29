import axios from "axios";
import { API_BASE_URL } from "./baseUrl";

// API interfaces based on the swagger documentation
export interface RegisterData {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password_confirm: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    id: number;
    email: string;
    full_name: string;
    access_token: string;
    refresh_token: string;
}

export interface RegisterResponse {
    message: string;
}

export interface PasswordResetData {
    email: string;
}

export interface SetNewPasswordData {
    password: string;
    password_confirm: string;
    uidb64: string;
    token: string;
}

export interface OTPVerificationData {
    otp: string;
}

export interface LogoutData {
    refresh_token: string;
}

// Axios instance with default config
const authApi = axios.create({
    baseURL: `${API_BASE_URL}/users`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Login user
export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
    try {
        const response = await authApi.post('/login/', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { detail: 'Login failed' };
        }
        throw { detail: 'Network error' };
    }
};

// Register user  
export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
    try {
        const response = await authApi.post('/register/', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { detail: 'Registration failed' };
        }
        throw { detail: 'Network error' };
    }
};

// Logout user
export const logoutUser = async (data: LogoutData): Promise<void> => {
    try {
        await authApi.post('/logout/', data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { detail: 'Logout failed' };
        }
        throw { detail: 'Network error' };
    }
};

// Password reset request
export const requestPasswordReset = async (data: PasswordResetData): Promise<{ message: string }> => {
    try {
        const response = await authApi.post('/password-reset/', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { detail: 'Password reset failed' };
        }
        throw { detail: 'Network error' };
    }
};

// Confirm password reset
export const confirmPasswordReset = async (uidb64: string, token: string): Promise<{ success: boolean; message: string; uidb64: string; token: string }> => {
    try {
        const response = await axios.get(`${API_BASE_URL.replace('/api', '')}/password-reset-confirm/${uidb64}/${token}/`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { message: 'Password reset confirmation failed' };
        }
        throw { message: 'Network error' };
    }
};

// Set new password
export const setNewPassword = async (data: SetNewPasswordData): Promise<{ message: string }> => {
    try {
        const response = await authApi.patch('/set-new-password/', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { detail: 'Password update failed' };
        }
        throw { detail: 'Network error' };
    }
};

// Verify email with OTP
export const verifyEmail = async (data: OTPVerificationData): Promise<{ message: string }> => {
    try {
        const response = await authApi.post('/verify-email/', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { message: 'Email verification failed' };
        }
        throw { message: 'Network error' };
    }
};

// Legacy functions for backward compatibility
export const login = loginUser;
export const register = registerUser;

export default {
    loginUser,
    registerUser,
    logoutUser,
    requestPasswordReset,
    confirmPasswordReset,
    setNewPassword,
    verifyEmail,
    // Legacy exports
    login,
    register
};
