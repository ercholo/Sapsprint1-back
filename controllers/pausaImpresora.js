const { exec } = require('child_process');
const regexCorrecto = /(Correcto|Success)/gi;
let pausa = Boolean;

const pausar = (printer) => {

    return new Promise((resolve, reject) => {

        exec(`cscript prnqctl.vbs -z -s SAPSPRINT -p ${printer}`, { cwd: 'C:\\Windows\\System32\\Printing_Admin_Scripts\\es-ES' }, (error, stdout, stderr) => {

            //Si hay errores, que los muestre
            if (error) {
                console.log(stdout);
                console.log(stderr);
                reject();
            };

            //Si la impresora devuelve Correcto entontes pusa = true
            if (stdout.match(regexCorrecto)) {
                pausa = true
            } else { pausa =  false }

            resolve(
                {
                    pausa: pausa
                }
            );
        });
    });
};

module.exports = pausar;