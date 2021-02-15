'use strict'

const http = require('http')

const Request = require('./Request')
const Response = require('./Response')

/**
 * Represents the server
 */
class Server {
  /**
   * Creates a server
   * @param {object} params
   * @param {number} params.port - HTTP Port
   */
  constructor (params) {
    const { port } = params

    this._port = port
    this._server = http.createServer()
    this._routes = {
      default: ({ method, url }, response) => {
        return response
          .setStatusCode(404)
          .send(`Route ${method} for ${url} not found`)
      }
    }

    this._server.on('request', (httpRequest, httpResponse) => {
      const data = []
      httpRequest
        .on('data', chunk => data.push(chunk))
        .on('end', () => {
          const { headers, method, url } = httpRequest

          let body = Buffer.concat(data).toString()

          if (headers['content-type'] === 'application/json') body = JSON.parse(body)

          const request = new Request({ ...httpRequest, body })
          const response = new Response(httpResponse)

          if (this._routes[url] && this._routes[url][method]) {
            this._routes[url][method](request, response)
          } else {
            this._routes.default(request, response)
          }
        })
    })
  }

  /**
   * Appends a new route using the method GET
   * @param {string} url - Request URL
   * @param {function} callback - Request handler
   */
  get (url, callback) {
    this._routes[url] = {
      ...this._routes[url],
      GET: callback
    }
  }

  /**
   * Appends a new route using the method POST
   * @param {string} url - Request URL
   * @param {function} callback - Request handler
   */
  post (url, callback) {
    this._routes[url] = {
      ...this._routes[url],
      POST: callback
    }
  }

  /**
   * Appends a new route using the method PATCH
   * @param {string} url - Request URL
   * @param {function} callback - Request handler
   */
  patch (url, callback) {
    this._routes[url] = {
      ...this._routes[url],
      PATCH: callback
    }
  }

  /**
   * Appends a new route using the method PUT
   * @param {string} url - Request URL
   * @param {function} callback - Request handler
   */
  put (url, callback) {
    this._routes[url] = {
      ...this._routes[url],
      PUT: callback
    }
  }

  /**
   * Appends a new route using the method DELETE
   * @param {string} url - Request URL
   * @param {function} callback - Request handler
   */
  delete (url, callback) {
    this._routes[url] = {
      ...this._routes[url],
      DELETE: callback
    }
  }

  /**
   * Starts the server
   * @returns {Promise}
   */
  start () {
    return new Promise((resolve, _reject) => {
      this._server.listen(this._port, () => {
        resolve()
      })
    })
  }
}

module.exports = Server
