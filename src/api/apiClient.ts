export const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const apiClient = async <T>(endpoint: string, config?: RequestInit): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};
