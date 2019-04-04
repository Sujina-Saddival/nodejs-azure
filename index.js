const express = require('express');
const app = express();
const { user } = require('./config/routes');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const jwt = require('./config/jsonWebToken');
const cors = require('cors')
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', function(req, res){
  res.json({ title: 'Welcome to Edge Player'});
});
app.use(jwt());
app.use((err, req, res, next) => { if (err.name === 'UnauthorizedError' || err.name === 'Error') { res.status(401).json({"error" : err.name + ": " + err.message})  }})
user(app);

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))