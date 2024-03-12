import axios, { AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import config from '../../../config';

class RequestBase {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: config.API_ENDPOINT,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  }

  get(url: string): Promise<AxiosResponse> {
    return this.instance.request({
      url,
      method: 'GET',
    });
  }

  post(url: string, data: any): Promise<AxiosResponse> {
    return this.instance.request({
      url,
      method: 'POST',
      data,
    });
  }
}

export default RequestBase;
