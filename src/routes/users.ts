import express from 'express';
import {
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
} from '../controllers/users';

const router = express.Router();

router.route('/').get(getAllUsers);
router.get('/:id', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

export default router;
