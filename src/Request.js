'use strict'

/**
 * Represents the HTTP Request
 */
class Request {
  /**
   * Create a request
   * @param {object} params
   * @param {string} params.headers - HTTP Request headers
   * @param {string} params.method - HTTP Request method
   * @param {string} params.url - Request URL
   * @param {string} params.body - HTTP Request body
   */
  constructor ({ headers, method, url, body }) {
    this.headers = headers
    this.method = method
    this.url = url
    this.body = body
  }
}

module.exports = Request
