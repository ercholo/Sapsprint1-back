import { exec } from 'child_process';
const regInactiva = /inactivo|idle/gi;
const regImprimiendo = /imprimiendo|printing/gi;
const regPausa = /pausado|paused/gi;
const regSinPapel = /No\s\hay\s\papel|no\s\paper/gi;
const regSinConexion = /Sin conexi|offline/gi;
const regLowToner = /falta t|low toner/gi;
const noToner = /Sin t|no toner/gi;
const regError = /Error/g;
const regIp = /172\.30\.\d+\.\d+/g;
let ip = "";
let desviada = false;
let impresoraDesvio = "Sin desviar";
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
    },
    {
        impresora: "06ADCOM01",
        ip: "172.30.60.247"
    },
    {
        impresora: "06ALAV101",
        ip: "172.30.60.245"
    },
    {
        impresora: "06ALAV102",
        ip: "172.30.60.249"
    },
    {
        impresora: "06ALDEV01",
        ip: "172.30.60.246"
    },
    {
        impresora: "06ALEXP01",
        ip: "172.30.60.101"
    },
    {
        impresora: "06ALJEF01",
        ip: "172.30.60.241"
    },
    {
        impresora: "06ATTOM01",
        ip: "172.30.60.248"
    },
    {
        impresora: "08ALAV101",
        ip: "172.30.41.240"
    },
    {
        impresora: "08ALAV102",
        ip: "172.30.41.241"
    },
    {
        impresora: "08ALAV201",
        ip: "172.30.41.242"
    },
    {
        impresora: "08ALAV202",
        ip: "172.30.41.243"
    },
    {
        impresora: "08ALDEV01",
        ip: "172.30.41.244"
    },
    {
        impresora: "08ALEXP01",
        ip: "172.30.41.245"
    },
    {
        impresora: "08ALJEF01",
        ip: "172.30.41.246"
    },
    {
        impresora: "12ALAV101",
        ip: "172.30.111.248"
    },
    {
        impresora: "12ALAV102",
        ip: "172.30.111.249"
    },
    {
        impresora: "12ALDEV01",
        ip: "172.30.111.247"
    },
    {
        impresora: "12ALEXP01",
        ip: "172.30.111.246"
    },
    {
        impresora: "12ALJEF01",
        ip: "172.30.111.245"
    },
]

export const estados = (printer) => {

    return new Promise((resolve, reject) => {

        exec(`cscript prncnfg.vbs -g -s SAPSPRINT -p ${printer}`, { cwd: 'C:\\Windows\\System32\\Printing_Admin_Scripts\\es-ES' }, (error, stdout, stderr) => {

            // console.log(stdout)

            ip = stdout.match(regIp);

            //Comparo el puerto del stdout con el puerto que tiene predefinido la impresora. Si hay diferencias es que la impresora está desviada.
            for (let impresora of impresorasIP) {

                if (impresora.impresora === printer && ip[0] === impresora.ip) {

                    desviada = false;

                } else if (impresora.impresora === printer && ip[0] != impresora.ip) {

                    console.log(ip[0])
                    desviada = true;
                    impresoraDesvio = impresorasIP.find(impresora => impresora.ip === ip[0])
                }
            }

            //Si hay errores, que los muestre
            if (error) {
                console.log(stdout);
                console.log(stderr);
                reject();
            };

            //Busco el estado de la impresora en el stdout y lo devuelvo
            if (stdout.match(regInactiva)) {

                resolve(
                    {
                        impresora: printer,
                        estado: "INACTIVA",
                        desviada: desviada,
                        impresoraDesvio: impresoraDesvio.impresora,
                        ip: ip[0]
                    }
                );

            } else if (stdout.match(regImprimiendo)) {

                resolve(
                    {
                        impresora: printer,
                        estado: "IMPRIMIENDO",
                        desviada: desviada,
                        impresoraDesvio: impresoraDesvio.impresora,
                        ip: ip[0]
                    }
                );

            } else if (stdout.match(regPausa)) {

                resolve(
                    {
                        impresora: printer,
                        estado: "PAUSADA",
                        desviada: desviada,
                        impresoraDesvio: impresoraDesvio.impresora,
                        ip: ip[0]
                    }
                );

            } else if (stdout.match(regSinPapel)) {

                resolve(
                    {
                        impresora: printer,
                        estado: "SIN PAPEL",
                        desviada: desviada,
                        impresoraDesvio: impresoraDesvio.impresora,
                        ip: ip[0]
                    }
                );

            } else if (stdout.match(regSinConexion)) {

                resolve(
                    {
                        impresora: printer,
                        estado: "SIN CONEXION",
                        desviada: desviada,
                        impresoraDesvio: impresoraDesvio.impresora,
                        ip: ip[0]
                    }
                );

            } else if (stdout.match(regLowToner)) {

                resolve(
                    {
                        impresora: printer,
                        estado: "TÓNER BAJO",
                        desviada: desviada,
                        impresoraDesvio: impresoraDesvio.impresora,
                        ip: ip[0]
                    }
                );

            } else if (stdout.match(noToner)) {

                resolve(
                    {
                        impresora: printer,
                        estado: "NO TÓNER",
                        desviada: desviada,
                        impresoraDesvio: impresoraDesvio.impresora,
                        ip: ip[0]
                    }
                );
            } else if (stdout.match(regError)) {

                resolve(
                    {
                        impresora: printer,
                        estado: "ERROR",
                        desviada: desviada,
                        impresoraDesvio: impresoraDesvio.impresora,
                        ip: ip[0]
                    }
                );
            } else {
                resolve(
                    {
                        impresora: printer,
                        estado: "PROBABLEMENTE ERROR",
                        desviada: desviada,
                        impresoraDesvio: impresoraDesvio.impresora,
                        ip: ip[0]
                    }
                );
            }
        });
    });
};

// module.exports = estados;

// export default estados;