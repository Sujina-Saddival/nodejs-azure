const mongoose = require('mongoose');
require('dotenv').config();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.COSMOSDB_CONNSTR+"?ssl=true&replicaSet=globaldb", {
  useCreateIndex: true,
  useNewUrlParser: true,
})
.then(() => console.log('Connection to CosmosDB successful'))
.catch((err) => console.error(err));

module.exports = {
  User: require('../src/models/user.model'),
};