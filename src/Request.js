class Request {
  constructor (httpRequest) {
    const { headers } = httpRequest

    this.headers = headers
    this.body = []

    httpRequest
      .on('data', chunk => {
        this.body.push(chunk)
      })
      .on('end', () => {
        this.body = Buffer.concat(body).toString()
      })
  }
}

module.exports = Request
