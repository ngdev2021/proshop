import express from 'express';
const router = express.Router();
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    logoutUser,
    updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

 router.route('/').post(registerUser).get(getUsers);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.delete('/:id', deleteUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.post('/', registerUser);



// router
//     .route('/profile')
//     .get(protect, getUserProfile)
//     .put(protect, updateUserProfile);
// router
//     .route('/:id')
//     .delete(protect, admin, deleteUser)
//     .get(protect, admin, getUserById)
//     .put(protect, admin, updateUser);

export default router;

