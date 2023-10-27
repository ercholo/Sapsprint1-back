import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import corsOptions from './src/controllers/funciones.mjs';
import router from './routes/impresoras.mjs';
import 'winston-mongodb';
import logger from './src/utils/logger.mjs';
import dbConnection from './src/database/config.mjs';
// import Keycloak  from 'keycloak-connect';
import session from 'express-session';
import { keycloak, sessionMiddle } from './keycloak.mjs'

//variables de entorno
dotenv.config();

// logger.log("info", `Iniciando servicio ${process.env.MICRONAME}`);

//Crear servidor Express
const app = express();

//BBDD
// dbConnection();

// corsOptions;
app.options('*', cors(corsOptions));

app.use(cors(corsOptions));

//Directorio público.
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

app.use(sessionMiddle);

// console.log(keycloak.getConfig())

app.use( keycloak.middleware() );

// console.log(keycloak.getConfig());

//TODO: devolver trabajos y demás trabajos
app.use('/impresoras', keycloak.protect(), router);

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})