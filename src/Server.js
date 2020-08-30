const http = require('http')

const Request = require('./Request')
const Response = require('./Response')

class Server {
  constructor (props) {
    const { port } = props

    this._port = port
    this._server = http.createServer()
    this._routes = {}

    this._server.on('request', (httpRequest, httpResponse) => {
      const { method, url } = httpRequest

      const request = new Request(httpRequest)
      const response = new Response(httpResponse)

      this._routes[url] &&
      this._routes[url][method] &&
      this._routes[url][method](request, response)
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

  listen (callback) {
    this._server.listen(this._port, callback)
  }
}

module.exports = Server
