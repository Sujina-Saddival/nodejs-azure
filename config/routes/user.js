const { user } = require('../../src/api/controllers')

const userRoutes = function(app){
  app.get('/api/user', user.getUser);
  app.post('/api/register', user.register);
  app.post('/api/signIn', user.signIn);
}

module.exports = userRoutes;