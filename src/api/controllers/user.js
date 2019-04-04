const db = require('../../../config/db');
const respStructure = require('../apiResponse');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const User = db.User;

const getUser = async(req, res) => {
  const user = await User.findOne({email: req.query.Email}, {email: 1});
  if (user){
    return res.status(201).json(respStructure.responseStructure('GET', user))
  }
  return res.status(400).json(respStructure.responseStructure('ERROR', {message: "User not found!!"}))
};

module.exports.getUser = getUser;

const register = (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).json(respStructure.responseStructure('ERROR', errors))
  }

  const userObj = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    companyName: req.body.companyName,
    password: bcrypt.hashSync(req.body.password, 10),
  };

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      return res.status(400).json(respStructure.responseStructure('ERROR', { message: 'Account with that email address already exists.' }))
    }
    User.create(userObj, (err, user) => {
        if (err) {
          return res.status(400).json(respStructure.responseStructure('ERROR', err))
        }
        return res.status(201).json(respStructure.responseStructure('POST', {message: 'Registered Successfully!!'}))
    });
  });
};

module.exports.register = register;

const signIn = async(req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({email});
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ username: user.username }, JWT_SECRET);
      return res.status(201).json(respStructure.responseStructure('POST', {message: 'Logined Successfully!!', token }))
    }
  }
  return res.status(422).json(respStructure.responseStructure('ERROR', { message: 'username/password is invalid' }))
};

module.exports.signIn = signIn;