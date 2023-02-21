
import Router from 'express';
// import path from 'path';
import Contenedor from '../dao/filesystem/contenedor.js';
import __dirname from '../utils/utils.js'

const router = new Router();

// const productos = new Contenedor(path.join(__dirname, "../data/productos.json"));
const productos = new Contenedor("../data/productos.json");

router.get('/productos', async (req, res) => {
    const prod = await productos.getAll();
    res.render('productos', { prod })
});

router.post('/productos', async (req, res) => {
    let prod = req.body
    await productos.save(prod)
    res.redirect('/')
});

export default router;
