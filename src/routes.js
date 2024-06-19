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

routes.post('/auth',schemaValidator(authSchema), AuthenticationController.authenticate);
routes.post('/user', schemaValidator(userSchema), UserController.create);

routes.get('/health', (req, res) => {
  return res.send({message: 'Connected with sucess in port 3000'});
});

routes.use(AuthenticationMiddleware);  // o que está abaixo precisa de autenticação

routes.put('/user', UserController.update);
routes.delete('/user', UserController.delete);
routes.get('/user', UserController.userProfile);

routes.post('/upload', upload.single('image'), fileController.upload);

routes.post('/posts', schemaValidator(postSchema), PostController.create);
routes.delete('/posts/:id', PostController.delete);
routes.put('/posts/:id', PostController.update);
routes.get('/posts', PostController.listAllPosts);

routes.put('/posts/add-like/:id', PostController.addLike);
routes.get('/posts/my-posts', PostController.listMyPosts);

module.exports = routes;