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

    // Use for redirection after unathorized requests
    this.instance.interceptors.response.use(
      function (response: AxiosResponse) {
        return response;
      },
      function (error: AxiosError) {
        let _error = error;
        //! It should be 401, but the server returns 403
        if (error.response?.status === 403) {
          _error = {
            ...error,
            response: {
              ...error.response,
              status: 403,
              data: {
                redirect: true,
                retirectTo: '/',
                logout: true,
              },
            },
          };
        }
        return Promise.reject(_error);
      }
    );
  }

  get(url: string): Promise<AxiosResponse> {
    return this.instance.request({
      url,
      method: 'GET',
    });
  }

  post(url: string, data?: any): Promise<AxiosResponse> {
    return this.instance.request({
      url,
      method: 'POST',
      data,
    });
  }
}

export default RequestBase;
