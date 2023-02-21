
import { addCart, deleteCart, getProducts, addProductToCart, deleteProduct } from "../dao/filesystem/contenedorCart.js"; // agregado nuevo
import Router from 'express'

const router = new Router();

//Add a cart
router.post('/cart', (req, res) => addCart(req, res));

//Delete cart
router.delete('/cart/:id', (req, res) => deleteCart(req, res));

//Get products form an specific cart
router.get('/cart/:id/products', (req, res) => getProducts(req, res));

//Add a product to a cart
router.post('/cart/:id/products', (req, res) => addProductToCart(req, res));

//Delete a product from a cart
router.delete('/cart/:id/products/:id_prod', (req, res) => deleteProduct(req, res));

export default router;
