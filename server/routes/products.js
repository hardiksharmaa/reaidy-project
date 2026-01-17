import express from 'express';
import { 
    getProducts, 
    getProductById, 
    createProduct,
    deleteProduct 
} from '../controllers/products.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/', verifyToken, createProduct); 
router.delete('/:id', verifyToken, deleteProduct); 

export default router;