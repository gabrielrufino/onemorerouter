class Response {
  constructor (httpResponse) {
    this._httpResponse = httpResponse
  }

  appendHeader (name, value) {
    this._httpResponse.setHeader(name, value)

    return this
  }

  setStatusCode(statusCode) {
    this._httpResponse.statusCode = statusCode
  }

  send (data) {
    this._httpResponse.end(data)
  }
}

module.exports = Response
