import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

export default class ApiProvider {
  private api: AxiosInstance;
  public constructor(config: any) {
    this.api = axios.create(config);
    this.api.interceptors.request.use((param: AxiosRequestConfig) => ({
      ...param,
      headers: {
        ...param.headers,
      },
    }));
  }

  public async request<T>(config: any): Promise<any> {
    let result: any;
    try {
      const response = await this.api.request<any>(config);

      return response.data;
    } catch (error: any) {
      let result = error;

      return error.response.data;
    }
  }
}

