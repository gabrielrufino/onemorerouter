'use strict'

const http = require('http')

const Request = require('./Request')
const Response = require('./Response')

class Server {
  constructor (props) {
    const { port } = props

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

          if (headers['Content-Type'] === 'application/json') body = JSON.parse(body)

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

  get (url, callback) {
    if (this._routes[url]) {
      this._routes[url].GET = callback
    } else {
      this._routes[url] = {
        GET: callback
      }
    }
  }

  post (url, callback) {
    if (this._routes[url]) {
      this._routes[url].POST = callback
    } else {
      this._routes[url] = {
        POST: callback
      }
    }
  }

  patch (url, callback) {
    if (this._routes[url]) {
      this._routes[url].PATCH = callback
    } else {
      this._routes[url] = {
        PATCH: callback
      }
    }
  }

  put (url, callback) {
    if (this._routes[url]) {
      this._routes[url].PUT = callback
    } else {
      this._routes[url] = {
        PUT: callback
      }
    }
  }

  delete (url, callback) {
    if (this._routes[url]) {
      this._routes[url].DELETE = callback
    } else {
      this._routes[url] = {
        DELETE: callback
      }
    }
  }

  start () {
    return new Promise((resolve, _reject) => {
      this._server.listen(this._port, () => {
        resolve()
      })
    })
  }
}

module.exports = Server
