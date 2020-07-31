const fs = require('fs');
const { describe } = require('yargs');

let listadoPorHacer = [];

const guardarBD = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });

}

const caragarDB = () => {

    try {

        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }

}


const crear = (descripcion) => {

    caragarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarBD();

    return porHacer;

}

const getListado = () => {
    caragarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    caragarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index.completado = completado];
        guardarBD();
        return true;

    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    caragarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarBD();
        return true;
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}