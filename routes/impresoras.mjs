// host + /impresoras
import logger from '../src/utils/logger.mjs';
import { Router, request, response } from 'express';
import dotenv from 'dotenv';
import { pausar, reanudar, trabajos, estados, desviarImpresora, desviarImpresoraOriginal } from '../src/controllers/index.mjs';

let numeroPeticiones = 0;

const router = Router();

//variables de entorno
dotenv.config();

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

router.get('/:nombreImpresora', async (req, res = response) => {

    // console.log(req.query.almacen)
    // console.log(req.query.HUEVO)

    // console.log(req.kauth.grant.access_token.content.email);
    let nombreImpresora = req.params.nombreImpresora;

    logger.log(
        {
            level: 'mongodb',
            message: `Actualizar trabajo impresora ${nombreImpresora} por el usuario ${req.kauth.grant.access_token.content.email}`
        }
    );

    let request = trabajos(nombreImpresora)
        .then((response) => res.json(response))
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
});

router.get('/:nombreImpresora/pausa', async (req, res = response) => {
    
    let nombreImpresora = req.params.nombreImpresora;

    logger.log(
        {
            level: 'mongodb',
            message: `Impresora ${nombreImpresora} pausada por el usuario ${req.kauth.grant.access_token.content.email}`
        }
    );


    let request = pausar(nombreImpresora)
        .then((response) => res.json(response))
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
});

router.get('/:nombreImpresora/reanuda', async (req, res = response) => {

    let nombreImpresora = req.params.nombreImpresora;

    logger.log(
        {
            level: 'mongodb',
            message: `Impresora ${nombreImpresora} reanudada por el usuario ${req.kauth.grant.access_token.content.email}`
        }
    );

    let request = reanudar(nombreImpresora)
        .then((response) => res.json(response))
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
});

router.get('/:nombreImpresora/estado', async (req, res = response) => {

    let nombreImpresora = req.params.nombreImpresora;

    // logger.log(
    //     {
    //         level: 'mongodb',
    //         message: `Usuario ${req.kauth.grant.access_token.content.email} ha solicitado estado de la impresora ${nombreImpresora}`
    //     }
    // );

    let request = estados(nombreImpresora)
        .then((response) => res.json(response))
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
});

router.get('/:nombreImpresoraDesviada/:nombreImpresoraDestino/desviar', async (req, res = response) => {

    logger.log(
        {
            level: 'mongodb',
            message: `El usuario ${req.kauth.grant.access_token.content.email} ha desviado la impresora ${req.params.nombreImpresoraDesviada} por la ${req.params.nombreImpresoraDestino}`
        }
    ); 

    let request = desviarImpresora(req.params.nombreImpresoraDesviada, req.params.nombreImpresoraDestino)
        .then((response) => res.json(response))
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
});

router.get('/:nombreImpresora/desviarImpresoraOriginal', async (req, res = response) => {

    let nombreImpresora = req.params.nombreImpresora;

    logger.log(
        {
            level: 'mongodb',
            message: `El usuario ${req.kauth.grant.access_token.content.email} ha devuelto a su ip original la impresora ${nombreImpresora} }`
        }
    ); 

    let request = desviarImpresoraOriginal(nombreImpresora)
        .then((response) => res.json(response))
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
});

router.get('/:nombreImpresora/pagPrueba', async (req, res = response) => {

    let nombreImpresora = req.params.nombreImpresora;

    logger.log(
        {
            level: 'mongodb',
            message: `El usuario ${req.kauth.grant.access_token.content.email} ha impreso una página de prueba por ${nombreImpresora} }`
        }
    ); 

    let request = imprimirPaginaPrueba(nombreImpresora)
        .then((response) => res.json(response))
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
});

// module.exports = router;

export default router;