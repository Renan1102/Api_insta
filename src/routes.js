const {Router} = require('express');
const AuthenticationController = require('./apps/controllers/AuthenticationController');
const authSchema = require('./schema/auth.schema.json');

const schemaValidator = require('./apps/middlewares/schemaValidator');
const UserController = require('./apps/controllers/UserController');
const userSchema = require('./schema/create.user.schema.json');

const routes = new Router();

routes.post('/Users', schemaValidator(userSchema), UserController.create);

routes.post('/auth',schemaValidator(authSchema), AuthenticationController.authenticate);
routes.get('/health', (req, res) => {
  return res.send({message: 'Connected with sucess in port 3000'});
});

module.exports = routes;