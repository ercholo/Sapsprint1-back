const { exec } = require('child_process');
const regexCorrecto = /Correcto|Success/gi;
let reanuda = Boolean;

const reanudar = (printer) => {

    return new Promise((resolve, reject) => {

        exec(`cscript prnqctl.vbs -m -s SAPSPRINT -p ${printer}`, { cwd: 'C:\\Windows\\System32\\Printing_Admin_Scripts\\es-ES' }, (error, stdout, stderr) => {

            //Si hay errores, que los muestre
            if (error) {
                console.log(stdout);
                console.log(stderr);
                reject();
            };

            //Si la impresora devuelve Correcto entontes pusa = true
            if (stdout.match(regexCorrecto)) {
                reanuda = true
            } else { reanuda =  false }

            resolve(
                {
                    reanuda: reanuda
                }
            );
        });
    });
};

module.exports = reanudar;