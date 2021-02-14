# One more router

Just one More HTTP router for learning purpose (Don't use for production)

## Getting started

Install the package:

```
npm install onemorerouter
```

Create a server:

```js
const { Server } = require('onemorerouter')

const server = new Server({ port: 3000 })

const users = []

server.get('/', (request, response) => {
  response.send('Hello world!')
})

server.get('/users', (request, response) => {
  response.sendJSON(users)
})

server.post('/users', (request, response) => {
  const user = {
    name: request.body.name
  }

  users.push(user)

  response.sendJSON(user)
})

server
  .start()
  .then(() => console.log('Listening on 3000'))
```
