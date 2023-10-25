import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import corsOptions from './src/controllers/funciones.mjs';
import router from './routes/impresoras.mjs';
import logger from './src/utils/logger.mjs';
import dbConnection from './src/database/config.mjs';
import 'winston-mongodb';

//variables de entorno
dotenv.config();

logger.log("info", `Iniciando servicio ${process.env.MICRONAME}`);

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

//TODO: devolver trabajos y demás trabajos
app.use('/impresoras', router);

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})