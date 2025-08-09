/**
 * Simple fetch utility for making HTTP requests
 */

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  return fetch(url, defaultOptions);
};

export const fetchJson = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetchWithAuth(url, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}; 