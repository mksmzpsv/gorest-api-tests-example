export default class BaseController {
  /**
  * @typedef ControllerOptions {Object}
  * @property {string} prefixUrl - base URL.
  * @property {Object} RequestBuilder - request builder instance.
  */

  /**
   * @constructor
   * @param {ControllerOptions} options
   */
  constructor(options) {
    this.options = options;
  }

  request() {
    return new this.options.RequestBuilder()
      .prefixUrl(this.options.prefixUrl)
      .headers(this.options.headers);
  }
}
