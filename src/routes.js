const {Router} = require('express');
const {upload} = require('./configs/multer');
const AuthenticationController = require('./apps/controllers/AuthenticationController');
const authSchema = require('./schema/auth.schema.json');

const AuthenticationMiddleware = require('./apps/middlewares/authentication');

const schemaValidator = require('./apps/middlewares/schemaValidator');
const UserController = require('./apps/controllers/UserController');
const userSchema = require('./schema/create.user.schema.json');
const fileController = require('./apps/controllers/fileController');

const PostController = require('./apps/controllers/PostController');
const postSchema = require('./schema/post.schema.json');

const routes = new Router();

routes.post('/Users', schemaValidator(userSchema), UserController.create);

routes.post('/auth',schemaValidator(authSchema), AuthenticationController.authenticate);


routes.get('/health', (req, res) => {
  return res.send({message: 'Connected with sucess in port 3000'});
});

routes.use(AuthenticationMiddleware);  // o que está abaixo precisa de autenticação

routes.put('/user', UserController.update);
routes.delete('/user', UserController.delete);
routes.get('/user-profile', UserController.userProfile);

routes.post('/upload', upload.single('image'), fileController.upload);

routes.post('/post', schemaValidator(postSchema), PostController.create);
routes.delete('/post/:id', PostController.delete);
routes.put('/post/:id', PostController.update);
routes.put('/add-like/:id', PostController.addLike);
module.exports = routes;