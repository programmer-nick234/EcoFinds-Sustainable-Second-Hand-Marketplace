import api from './api';

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
  is_active?: boolean;
  last_login?: string;
  profile_picture?: string;
  phone_number?: string;
  address?: string;
}

export interface LoginData {
  username: string;
  password: string;
  remember_me?: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirm: string;
  phone_number?: string;
  terms_accepted: boolean;
}

export interface PasswordResetData {
  email: string;
}

export interface PasswordResetConfirmData {
  token: string;
  new_password: string;
  new_password_confirm: string;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
  new_password_confirm: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface AuthError {
  message: string;
  field?: string;
  code?: string;
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post('/accounts/login/', data);
      const { access, refresh, user } = response.data;
      
      // Store tokens and user in localStorage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user', JSON.stringify(user));
      
      return response.data;
    } catch (error: unknown) {
      throw this.handleAuthError(error);
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post('/accounts/register/', data);
      const { access, refresh, user } = response.data;
      
      // Store tokens and user in localStorage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user', JSON.stringify(user));
      
      return response.data;
    } catch (error: unknown) {
      throw this.handleAuthError(error);
    }
  },

  async logout(): Promise<void> {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await api.post('/accounts/logout/', { refresh: refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  },

  async getProfile(): Promise<User> {
    try {
      const response = await api.get('/accounts/profile/');
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: unknown) {
      throw this.handleAuthError(error);
    }
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await api.put('/accounts/profile/update/', data);
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: unknown) {
      throw this.handleAuthError(error);
    }
  },

  async changePassword(data: ChangePasswordData): Promise<void> {
    try {
      await api.post('/accounts/change-password/', data);
    } catch (error: unknown) {
      throw this.handleAuthError(error);
    }
  },

  async requestPasswordReset(data: PasswordResetData): Promise<void> {
    try {
      await api.post('/accounts/password-reset/', data);
    } catch (error: unknown) {
      throw this.handleAuthError(error);
    }
  },

  async confirmPasswordReset(data: PasswordResetConfirmData): Promise<void> {
    try {
      await api.post('/accounts/password-reset-confirm/', data);
    } catch (error: unknown) {
      throw this.handleAuthError(error);
    }
  },

  async refreshToken(): Promise<string> {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await api.post('/accounts/token/refresh/', { refresh: refreshToken });
      const { access } = response.data;
      
      localStorage.setItem('access_token', access);
      return access;
    } catch (error: unknown) {
      this.logout();
      throw this.handleAuthError(error);
    }
  },

  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  getToken(): string | null {
    return localStorage.getItem('access_token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  handleAuthError(error: unknown): AuthError {
    if (error && typeof error === 'object' && 'response' in error) {
      const { data } = (error as any).response;
      
      // Handle field-specific errors
      if (data.non_field_errors) {
        return { message: data.non_field_errors[0] };
      }
      
      // Handle specific field errors
      const fieldErrors = Object.keys(data).filter(key => Array.isArray(data[key]));
      if (fieldErrors.length > 0) {
        const field = fieldErrors[0];
        return { 
          message: data[field][0], 
          field,
          code: (error as any).response.status.toString()
        };
      }
      
      // Handle general error message
      if (data.detail) {
        return { message: data.detail };
      }
      
      if (data.message) {
        return { message: data.message };
      }
    }
    
    // Handle network errors
    if (error && typeof error === 'object' && 'code' in error && (error as any).code === 'NETWORK_ERROR') {
      return { message: 'Network error. Please check your connection.' };
    }
    
    // Default error
    return { message: 'An unexpected error occurred. Please try again.' };
  }
};
