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

server.get('/', (request, response) => {
  response.send('Hello, world!')
})

server.listen(() => console.log('Listening on 3000'))
```
