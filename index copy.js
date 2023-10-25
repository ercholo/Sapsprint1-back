import expressApp from "./services/expressApp.mjs";
import logger from "./utils/logger.mjs";

const main = async () => {
    logger.info(`Iniciando servicio ${process.env.MICRONAME}`);
    await expressApp({
        puerto: parseInt(process.env.EXPRESS_PORT, 10) || 8888,
        parsers: {
            json: {
                activo: true,
                opciones: {
                    limit: process.env.EXPRESS_MAX_BODY_SIZE || "1mb",
                },
            },
        },
    });
};

main().catch((error) => {
    logger.fatal(`La aplicación ha tenido un error irrecuperable: ${error.message}`);
});

export { };