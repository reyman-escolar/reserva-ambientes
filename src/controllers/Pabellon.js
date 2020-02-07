const { Pabellon, Ambiente, Reserva } = require('./../config/Sequelize');
// Con el objeto pabellon, se accedera a la base de datos 
// en la tabla t_pabellon
const { Op } = require('sequelize');

const getPabellones = (req, res) => {
    Pabellon.findAll({
        include: [{
            model: Ambiente
        }]
    }).then((pabellones) => {
        res.json({
            ok: true,
            contenido: pabellones
        })
    })
}
const postPabellon = (req, res) => {
    let objPabellon = req.body.objPabellon;
    // Forma 1, creando primero la instancia de un 
    // Pabellon para guardarlo en la BD posteriormente
    let objPab = Pabellon.build(objPabellon);
    objPab.save().then((pabellonCreado) => {
        res.status(201).json({
            ok: true,
            contenido: pabellonCreado,
            mensaje: 'El pabellon ha sido creado con exito'
        })
        // Si no le pones estado a tu respuesta automaticamente es el numero 200
        // el send se usa para enviar una cadena de texto
        // res.status(200).send('ok')
    })
}
const postPabellonConCreate = (req, res) => {
    // {} gracias a destructuracion de EM6
    // Forma 2, Crear y guardar una instacia de un Pabellon en un solo paso
    // pero hay que tener cuidado por que si hay un error en la creacion de ese objeto a la siguiente vez, saltara su correlativo de la primary key
    let { objPabellon } = req.body;
    Pabellon.create(objPabellon).then((pabellonCreado) => {
        res.status(201).json({
            ok: true,
            contenido: pabellonCreado,
            mensaje: 'El pabellon ha sido creado con exito'
        });
    });
}
const putPabellon = (req, res) => {
    let { id_pabellon } = req.params;
    let { objPabellon } = req.body;
    // findAll, findOne, findByPk
    Pabellon.findByPk(id_pabellon).then((pabellon) => {
        console.log(pabellon);
        if (pabellon) {
            // anidamiento de promesas
            return Pabellon.update(objPabellon, {
                where: { pab_id: id_pabellon }
            })
        }
        else {
            res.status(404).json({
                ok: false,
                contenido: null,
                mensaje: 'No se encontro es pabellon'
            })
        }
    }).then(pabellonActualizado => {
        res.status(200).json({
            ok: true,
            contenido: pabellonActualizado,
            mensaje: 'el pabellon se actualizado exitosamente'
        })
    })
}
const getPabellonLike = (req, res) => {
    // el get no es remcomendable pasarle por el body
    let { palabra } = req.params
    // Select * from Pabellon Where pab_nom '%' + palabra + '%'
    Pabellon.findAll({
        where: {
            pab_nom: {
                [Op.like]: '%' + palabra + '%'
            }
        }
    }).then(pabellones => {
        res.status(200).json({
            ok: true,
            contenido: pabellones
        })
    })
}
const getAmbienteByPabelon = (req, res) => {
    let { id_pabellon } = req.params;
    Pabellon.findByPk(id_pabellon, {
        attributes: [],
        include: [{
            model: Ambiente,
            attributes: ['amb_id', 'amb_nro', 'amd_foro', 'amd_tipo']
        }]
    }).then(pabellon => {
        res.status(200).json({
            ok: true,
            contenido: pabellon
        })
    })
}
const getReservaByPabellon = (req, res) => {
    let { id_pabellon } = req.params;
    Pabellon.findByPk(id_pabellon, {
        include: [{
            model: Ambiente,
            include: [{
                model: Reserva
            }]
        }]
    }).then(reservas => {
        res.status(200).json({
            ok: true,
            contenido: reservas
        })
    })
}
module.exports = {
    getPabellones: getPabellones,
    postPabellon,
    postPabellonConCreate,
    putPabellon,
    getPabellonLike,
    getAmbienteByPabelon,
    getReservaByPabellon
}
