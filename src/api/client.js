import UserController from './controller/userController';
import JsonRequest from './requestBuilder/jsonRequest';

export default class ApiClient {
  constructor(options = {}) {
    const defaultOptions = {
      prefixUrl: process.env.BASE_URL ?? 'https://gorest.co.in/public/v2/',
      RequestBuilder: JsonRequest,
    };
    const mergedOptions = {
      ...defaultOptions,
      ...options,
    };
    this.user = new UserController(mergedOptions);
  }

  static unauthorized() {
    return new ApiClient();
  }

  static authorized(token = undefined) {
    const authToken = token ?? process.env.AUTH_TOKEN;
    return new ApiClient({
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }
}
