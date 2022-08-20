import ApiProvider from './api-provider'

import { Method } from 'axios'
import HttpMethod from './http'
export default class ApiService {
  private provider: ApiProvider;

  constructor(config: any) {
    this.provider = new ApiProvider(config)
  }

  protected get<T>(url: string, config?: any): Promise<any> {
    const method = HttpMethod.GET
    return this.provider.request({ method, url, ...config })
  }

  protected delete<T>(
    url: string,
    config?: any  
  ): Promise<any> {
    const method = HttpMethod.DELETE
    return this.provider.request({ method, url, ...config })
  }

  protected post<T>(
    url: string,
    data?: any,
    config?: any
  ): Promise<any> {
    const method = HttpMethod.POST
    return this.provider.request({
      method,
      url,
      data,
      ...config,
    })
  }

  protected put<T>(
    url: string,
    data?: any,
    config?: any
  ): Promise<any> {
    const method = HttpMethod.PUT
    return this.provider.request({
      method,
      url,
      data,
      ...config,
    })
  }

  protected patch<T>(
    url: string,
    data?: any,
    config?: any
  ): Promise<any> {
    const method = HttpMethod.PATCH
    return this.provider.request({
      method,
      url,
      data,
      ...config,
    })
  }
}
