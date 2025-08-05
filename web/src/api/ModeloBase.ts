import axios, { type AxiosResponse } from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export class ModeloBase {
  apiURL: string;
  modulePath: string;

  constructor(path: string) {
    this.modulePath = path;
    this.apiURL = API_URL;
  }

  private async getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      Authorization: token || '',
    };
  }

  async defaultPostRequest<T>(path: string, data?: object): Promise<AxiosResponse<T>> {
    const headers = await this.getAuthHeaders();
    const response = await axios.post<T>(
      this.apiURL + this.modulePath + path,
      data,
      { headers }
    );
    return response;
  }

  async defaultGetRequest<T>(path: string, params?: object): Promise<AxiosResponse<T>> {
    const headers = await this.getAuthHeaders();
    const response = await axios.get<T>(
      this.apiURL + this.modulePath + path,
      {
        headers,
        params,
      }
    );
    return response;
  }

  async defaultPutRequest<T>(path: string, data?: object): Promise<AxiosResponse<T>> {
    const headers = await this.getAuthHeaders();
    const response = await axios.put<T>(
      this.apiURL + this.modulePath + path,
      data,
      { headers }
    );
    return response;
  }

  async defaultDeleteRequest<T>(path: string): Promise<AxiosResponse<T>> {
    const headers = await this.getAuthHeaders();
    const response = await axios.delete<T>(
      this.apiURL + this.modulePath + path,
      { headers }
    );
    return response;
  }
}

export interface ISpringResponse<T> {
  data: T;
  status: number;
}
