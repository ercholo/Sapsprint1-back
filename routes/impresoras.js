// host + /impresoras

const { Router, request, response } = require('express');
const router = Router();
require('dotenv').config();
// const { response } = require('express');
const pausar = require('../controllers/pausaImpresora');
const reanudar = require('../controllers/reanudaImpresora');
const trabajos = require('../controllers/devuelveTrabajos');
const estados = require('../controllers/devuelveEstado');
const desviarImpresora = require('../controllers/desviaImpresoras');
const desviarImpresoraOriginal = require('../controllers/desviaIpOriginal');
let numeroPeticiones = 0;
const impresoras = ["01ALAV101", "01ALAV102", "01ALAV201", "01ALAV202", "01ALDEV01", "01ALENT01", "01ALJEF01", "01ALPSI01", "01ALPYE01", "01ALPYE02", "01ALSAA01", "01ALSAF01", "01ALSAL01", "01ATTOM01", "01ATTOM02"]

router.get('/', async (req, res = response) => {

    let request = impresoras.map(impresora => trabajos(impresora))

    Promise.allSettled(request)

        .then((response) => res.json(response))
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
        .finally(() => {
            numeroPeticiones++;
        })
});

// router.get('/', async (req, res = response) => {

//     let request = impresoras.map(impresora => trabajos(impresora))

//     Promise.allSettled(request)

//         .then((response) => res.json(response))
//         .catch((error) => {
//             res.status(500).json({ error: error.message })
//         })
//         .finally(() => {
//             numeroPeticiones++;
//         })
// });

router.get('/:nombreImpresora', async (req, res = response) => {

    // console.log(req.query.almacen)
    // console.log(req.query.HUEVO)

    let nombreImpresora = req.params.nombreImpresora;

    let request = trabajos(nombreImpresora)
        .then((response) => res.json(response))
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
});

router.get('/:nombreImpresora/pausa', async (req, res = response) => {

    let nombreImpresora = req.params.nombreImpresora;

    let request = pausar(nombreImpresora)
        .then((response) => res.json(response))
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
});

router.get('/:nombreImpresora/reanuda', async (req, res = response) => {

    let nombreImpresora = req.params.nombreImpresora;

    let request = reanudar(nombreImpresora)
        .then((response) => res.json(response))
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
});

router.get('/:nombreImpresora/estado', async (req, res = response) => {

    let nombreImpresora = req.params.nombreImpresora;

    let request = estados(nombreImpresora)
        .then((response) => res.json(response))
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
});

router.get('/:nombreImpresoraDesviada/:nombreImpresoraDestino/desviar', async (req, res = response) => {

    let request = desviarImpresora(req.params.nombreImpresoraDesviada, req.params.nombreImpresoraDestino)
        .then((response) => res.json(response))
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
});

router.get('/:nombreImpresora/desviarImpresoraOriginal', async (req, res = response) => {

    let nombreImpresora = req.params.nombreImpresora;

    let request = desviarImpresoraOriginal(nombreImpresora)
        .then((response) => res.json(response))
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
});

router.get('/:nombreImpresora/pagPrueba', async (req, res = response) => {

    let nombreImpresora = req.params.nombreImpresora;

    let request = imprimirPaginaPrueba(nombreImpresora)
        .then((response) => res.json(response))
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
});

module.exports = router;