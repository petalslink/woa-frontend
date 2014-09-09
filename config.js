module.exports = {
  port: 3000,
  token: '123',
  mongo: {
    url: 'mongodb://127.0.0.1:27017/woa'
  },
  petals: {
    url: 'http://localhost:8084'
  },
  mapping: {
    '/api/:resource/:uuid': '/petals/rest/:resource/?uuid=:uuid'
  }
};