const { exec } = require('child_process');

const impresorasIP = [
    {
        impresora: "01ALAV101",
        ip: "172.30.2.51"
    },
    {
        impresora: "01ALAV102",
        ip: "172.30.2.50"
    },
    {
        impresora: "01ALAV201",
        ip: "172.30.2.52"
    },
    {
        impresora: "01ALAV202",
        ip: "172.30.2.56"
    },
    {
        impresora: "01ALDEV01",
        ip: "172.30.2.91"
    },
    {
        impresora: "01ALENT01",
        ip: "172.30.2.40"
    },
    {
        impresora: "01ALJEF01",
        ip: "172.30.2.58"
    },
    {
        impresora: "01ALPSI01",
        ip: "172.30.2.46"
    },
    {
        impresora: "01ALPYE01",
        ip: "172.30.2.5"
    },
    {
        impresora: "01ALPYE02",
        ip: "172.30.2.34"
    },
    {
        impresora: "01ALSAA01",
        ip: "172.30.2.23"
    },
    {
        impresora: "01ALSAF01",
        ip: "172.30.2.33"
    },
    {
        impresora: "01ALSAL01",
        ip: "172.30.2.12"
    },
    {
        impresora: "01ATTOM01",
        ip: "172.30.2.35"
    },
    {
        impresora: "01ATTOM02",
        ip: "172.30.2.120"
    },
    {
        impresora: "03ADCOM01",
        ip: "172.30.30.247"
    },
    {
        impresora: "03ATTOM01",
        ip: "172.30.30.246"
    },
    {
        impresora: "03ALSAL01",
        ip: "172.30.30.245"
    },
    {
        impresora: "03ALAV101",
        ip: "172.30.30.248"
    },
    {
        impresora: "03ALAV102",
        ip: "172.30.30.249"
    }
]

const regEnSuSitioOriginal = /(Impresora configurada|Configured printer)/gi;
let desviadaOriginal = Boolean;
let ip = String

const desviarImpresoraOriginal = (printer) => {

    for (let impresora of impresorasIP) {
        if (impresora.impresora === printer) {
            ip = impresora.ip;
        }
    }

    return new Promise((resolve, reject) => {

        exec(`cscript prncnfg.vbs -t -s sapsprint -p ${printer} -r ${ip}`, { cwd: 'C:\\Windows\\System32\\Printing_Admin_Scripts\\es-ES' }, (error, stdout, stderr) => {

            console.log(stdout)

            //Si hay errores, que los muestre
            if (error) {
                console.log(stdout);
                console.log(stderr);
                reject();
            };

            //Busca en el stdout si ha realizado la execución de manera correcta y la devuelvo.
            if (stdout.match(regEnSuSitioOriginal)) {
                desviadaOriginal = true
            } else { desviadaOriginal = false }

            resolve(
                {
                    desviadaOriginal: desviadaOriginal
                }
            );
        });
    });
};

module.exports = desviarImpresoraOriginal;