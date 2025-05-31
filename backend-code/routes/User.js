import express from 'express';
import multer from 'multer';
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/User.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('avatar'), createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', upload.single('avatar'), updateUser);
router.delete('/:id', deleteUser);

export default router;
