const expressJwt = require('express-jwt');
const JWT_SECRET = process.env.JWT_SECRET;

function jwt() {
  return expressJwt({
    secret: JWT_SECRET,
    credentialsRequired: false,
    getToken
  }).unless({
    path: [
      '/',
      '/api-docs',
      '/api/signIn',
      '/api/register',
    ]
  });
}

function getToken(req) {
  const { authorization } = req.headers;
  if (authorization) {
    return authorization;
  }else{
    throw new Error('authorization not found in headers!!')
  }
}
module.exports = jwt;