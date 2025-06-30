import axios, { AxiosError } from 'axios';
import { CONFIG } from '../constants/config';

export interface Repository {
  name: string;
  tags: string[];
}

export interface ImageDetails {
  architecture: string;
  os: string;
  layers: any[];
  created: string;
}

class RegistryApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'RegistryApiError';
  }
}

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const errorMessage = typeof axiosError.response.data === 'object' && axiosError.response.data
        ? (axiosError.response.data as { message?: string }).message || 'Unknown error'
        : axiosError.message || 'Unknown error';
      throw new RegistryApiError(
        errorMessage,
        axiosError.response.status
      );
    }
    if (axiosError.request) {
      throw new RegistryApiError('Network error. Please check your connection.');
    }
  }
  throw new RegistryApiError('An unexpected error occurred');
};

const api = axios.create({
  baseURL: CONFIG.API.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const registryApi = {
  async listRepositories(): Promise<Repository[]> {
    try {
      const response = await api.get('/_catalog');
      const repositories = response.data.repositories || [];
      return Promise.all(
        repositories.map(async (name: string) => {
          const tags = await this.listTags(name);
          return { name, tags };
        })
      );
    } catch (error) {
      handleApiError(error);
      throw error; // TypeScript requires this even though handleApiError always throws
    }
  },

  async listTags(repository: string): Promise<string[]> {
    try {
      const response = await api.get(`/${repository}/tags/list`);
      return response.data.tags || [];
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  async getImageManifest(repository: string, tag: string): Promise<ImageDetails> {
    try {
      const response = await api.get(
        `/${repository}/manifests/${tag}`,
        {
          headers: {
            Accept: CONFIG.API.HEADERS.ACCEPT.MANIFEST_V2,
          },
        }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  async deleteImage(repository: string, tag: string): Promise<void> {
    try {
      await api.delete(`/${repository}/manifests/${tag}`);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
};

export default registryApi;