import { createClient } from '@/lib/supabase';

/**
 * API client for making authenticated requests to the backend
 */
class ApiClient {
  private publicBaseUrl: string;
  private adminBaseUrl: string;
  
  constructor() {
    // Public read-only API
    this.publicBaseUrl = process.env.NEXT_PUBLIC_DATA_URL || 'https://data.bodegacatsgc.gg';
    // Admin API
    this.adminBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.bodegacatsgc.gg';
  }

  /**
   * Get the authentication token from Supabase
   */
  private async getAuthToken(): Promise<string | null> {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || null;
  }

  /**
   * Make an authenticated request to the admin backend API
   */
  private async adminRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.adminBaseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(error.message || `API error: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Make a request to the public read-only API
   */
  private async publicRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(`${this.publicBaseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(error.message || `API error: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Admin API methods (require authentication)
   */
  async adminGet<T>(endpoint: string): Promise<T> {
    return this.adminRequest<T>(endpoint, { method: 'GET' });
  }

  async adminPost<T>(endpoint: string, data: any): Promise<T> {
    return this.adminRequest<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async adminPut<T>(endpoint: string, data: any): Promise<T> {
    return this.adminRequest<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async adminDelete<T>(endpoint: string): Promise<T> {
    return this.adminRequest<T>(endpoint, { method: 'DELETE' });
  }

  /**
   * Public API methods (read-only)
   */
  async publicGet<T>(endpoint: string): Promise<T> {
    return this.publicRequest<T>(endpoint, { method: 'GET' });
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();
