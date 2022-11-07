import { Router } from 'express';

import CheckJwtMiddleware from './middlewares/CheckJwtMiddleware';
import UserValidation from './validations/UserValidation';

import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import SchoolController from './controllers/SchoolController';
import SegmentController from './controllers/SegmentController';
import SchoolValidation from './validations/SchoolValidation';

const router = Router();

router.post('/login', UserValidation.login, AuthController.login);

router.get('/users', CheckJwtMiddleware, UserController.index);
router.post('/users', CheckJwtMiddleware, UserValidation.store, UserController.store);
router.get('/users/:id', CheckJwtMiddleware, UserController.show);
router.put('/users/:id', CheckJwtMiddleware, UserValidation.update, UserController.update);
router.delete('/users/:id', CheckJwtMiddleware, UserController.destroy);

router.get('/schools', CheckJwtMiddleware, SchoolController.index);
router.post('/schools', CheckJwtMiddleware, SchoolValidation, SchoolController.store);
router.get('/schools/:id', CheckJwtMiddleware, SchoolController.show);
router.put('/schools/:id', CheckJwtMiddleware, SchoolController.update);
router.delete('/schools/:id', CheckJwtMiddleware, SchoolController.destroy);

router.get('/segments', CheckJwtMiddleware, SegmentController.index);

export default router;