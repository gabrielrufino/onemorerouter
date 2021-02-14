'use strict'

class Response {
  constructor (httpResponse) {
    this._httpResponse = httpResponse
  }

  appendHeader (name, value) {
    this._httpResponse.setHeader(name, value)

    return this
  }

  setStatusCode (statusCode) {
    this._httpResponse.statusCode = statusCode

    return this
  }

  send (data) {
    this._httpResponse.end(data)
  }

  sendJSON (data) {
    this._httpResponse.end(
      JSON.stringify(data)
    )
  }
}

module.exports = Response
