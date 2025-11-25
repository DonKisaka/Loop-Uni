import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getUserProducts
} from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/user/:userId', getUserProducts);
router.get('/:id', getProduct);

router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;

