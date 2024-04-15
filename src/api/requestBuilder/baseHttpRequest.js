import axios, { AxiosError } from 'axios';

export default class BaseHttpRequest {
  constructor() {
    this.options = {};
  }

  prefixUrl(url) {
    this.options.baseURL = url;
    return this;
  }

  /**
   * @param url Can be full url, but only in case prefixUrl is not set
   */
  url(url) {
    this.options.url = url;
    return this;
  }

  method(method) {
    this.options.method = method;
    return this;
  }

  headers(headers) {
    this.options.headers = this.options.headers ?? {};
    this.options.headers = {
      ...this.options.headers,
      ...headers,
    };
    return this;
  }

  searchParams(searchParams) {
    this.options.params = searchParams;
    return this;
  }

  async send() {
    try {
      return await axios(this.options);
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        return err.response;
      }
      throw err;
    }
  }
}
