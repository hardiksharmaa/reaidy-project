import express from 'express';
import { 
    getProducts, 
    getProductById, 
    createProduct,
    deleteProduct,
    updateProduct,
    getProductCategories
} from '../controllers/products.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/categories', getProductCategories);
router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/', verifyToken, verifyAdmin, createProduct);
router.put('/:id', verifyToken, verifyAdmin, updateProduct);
router.delete('/:id', verifyToken, verifyAdmin, deleteProduct);

export default router;