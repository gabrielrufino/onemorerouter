'use strict'

class Request {
  constructor (httpRequest) {
    const { headers, method } = httpRequest

    this.headers = headers

    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      this.body = []

      httpRequest
        .on('data', chunk => {
          this.body.push(chunk)
        })
        .on('end', () => {
          this.body = Buffer.concat(this.body).toString()

          const contentType = headers['Content-Type']

          if (contentType === 'application/json') {
            this.body = JSON.parse(this.body)
          }
        })
    }
  }
}

module.exports = Request
