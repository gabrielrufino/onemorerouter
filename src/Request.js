'use strict'

class Request {
  constructor ({ headers, method, url, body }) {
    this.headers = headers
    this.method = method
    this.url = url
    this.body = body
  }
}

module.exports = Request
