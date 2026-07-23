import { Router } from "express";
import { rateLimit } from 'express-rate-limit';
import { list, create, read, update, remove } from "../Controllers/product.js";

const router = Router();

const postLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    limit: 5,               
    message: { message: 'Too Many Requests' }
});
router.post('/product', postLimiter, create);

router.get('/product', list);
router.get('/product/:id', read);
router.post('/product', create);
router.put('/product/:id', update);
router.delete('/product/:id', remove);

export default router