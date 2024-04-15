import BaseHttpRequest from './baseHttpRequest';

export default class JsonRequest extends BaseHttpRequest {
  constructor() {
    super();
    this.options = {
      ...this.options,
      responseType: 'json',
    };
  }

  body(body) {
    this.options.data = body;
    return this;
  }
}
