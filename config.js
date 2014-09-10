module.exports = {
  port: 3000,
  token: '123',
  mongo: {
    url: 'mongodb://127.0.0.1:27017/woa'
  },
  routes: [
    {
      method: 'GET',
      // The resource which will be cached
      resource: {
        // where to find the resource id in the 'in' parameter
        id: 'uuid',
        // the name of the resource, should be unique (not enforced)
        name: 'bank'
      },
      in: '/api/bank/:uuid',
      out: 'http://localhost:3001/bank/account/:uuid/amount'
    },
    {
      method: 'GET',
      resource: {
        id: 'uuid',
        name: 'resource'
      },
      in: '/api/item/:resource/:uuid',
      out: 'http://locahost:8084/petals/rest/:resource/?id=:uuid'
    }
  ]
};