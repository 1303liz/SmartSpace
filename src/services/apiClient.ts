import axios from 'axios';
import { API_BASE_URL } from './baseUrl';

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to attach auth token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for consistent error handling
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses for debugging
    console.log(`API Response [${response.config.method?.toUpperCase()}] ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    // Log detailed error information
    if (axios.isAxiosError(error)) {
      console.error('API Error:', {
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        status: error.response?.status,
        data: error.response?.data
      });
      
      // Handle token expiration
      if (error.response?.status === 401) {
        // Redirect to login or refresh token
        console.warn('Authentication token expired or invalid');
      }
    } else {
      console.error('Network Error:', error);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;

// Helper method to make GET requests
export const apiGet = async (url: string, params?: any) => {
  console.log(`Making GET request to ${url} with params:`, params);
  const response = await apiClient.get(url, { params });
  return response.data;
};

// Helper method to make POST requests
export const apiPost = async (url: string, data: any) => {
  console.log(`Making POST request to ${url} with data:`, data);
  const response = await apiClient.post(url, data);
  return response.data;
};

// Helper method to make PUT requests
export const apiPut = async (url: string, data: any) => {
  console.log(`Making PUT request to ${url} with data:`, data);
  const response = await apiClient.put(url, data);
  return response.data;
};

// Helper method to make DELETE requests
export const apiDelete = async (url: string, params?: any) => {
  console.log(`Making DELETE request to ${url} with params:`, params);
  const response = await apiClient.delete(url, { params });
  return response.data;
};

// Manual fetch method with direct axios call (for debugging)
export const directFetch = async (url: string, token?: string) => {
  console.log(`Making direct fetch to ${url}`);
  
  const useToken = token || localStorage.getItem('access_token');
  if (!useToken) {
    console.error('No token available for API request');
    throw new Error('Authentication required');
  }
  
  try {
    // Make a direct axios call without using the instance
    const response = await axios({
      method: 'GET',
      url: `${API_BASE_URL}${url}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useToken}`,
        'X-Debug-Mode': 'true'
      }
    });
    
    console.log('Direct fetch response:', response.data);
    
    // Handle both formats - direct array or wrapped in a data property
    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      console.log('Returning nested data array from response');
      return response.data.data;
    }
    
    return response.data;
  } catch (error) {
    console.error('Direct fetch error:', error);
    throw error;
  }
};
