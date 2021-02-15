'use strict'

const { ServerResponse } = require('http')

/**
 * Represents the HTTP Response
 */
class Response {
  /**
   * Create a response
   * @param {ServerResponse} httpResponse 
   */
  constructor (httpResponse) {
    this._httpResponse = httpResponse
  }

  /**
   * Appends a new header to the HTTP response headers
   *
   * @param {string} name - Header name 
   * @param {string} value - Header value
   *
   * @returns {Response}
   */
  appendHeader (name, value) {
    this._httpResponse.setHeader(name, value)

    return this
  }

  /**
   * Sets a new HTTP status code
   *
   * @param {number} statusCode - New HTTP status code
   *
   * @returns {Response}
   */
  setStatusCode (statusCode) {
    this._httpResponse.statusCode = statusCode

    return this
  }

  /**
   * Sends the final HTTP response
   *
   * @param {string} data - Response message
   */
  send (data) {
    this._httpResponse.end(data)
  }

  /**
   * Sends the final HTTP Response as JSON
   *
   * @param {object} data
   */
  sendJSON (data) {
    this._httpResponse.end(
      JSON.stringify(data)
    )
  }
}

module.exports = Response
