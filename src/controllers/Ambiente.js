const { Ambiente, Pabellon } = require('./../config/Sequelize');
const { OP } = require('sequelize');
// req => Request, res => Response, next => Next Function
// express types

const getAmbienteWithPabellon = (req, res) => {
    Ambiente.findAll({
        include: [{
            model: Pabellon,
            attributes: ['pab_nom']
        }]
    }).then(ambientes => {
        res.status(200).json({
            ok: true,
            contenido: ambientes
        })
    })
}
const postAmbiente = (req, res) => {
    let { objAmbiente } = req.body;
    Ambiente.build(objAmbiente).save().then(ambienteCreado => {
        res.status(201).json({
            ok: true,
            contenido: ambienteCreado,
            mensaje: 'El ambiente fue creado exitosamente'
        })
    }).catch(error => {
        res.status(500).json({
            ok: false,
            contenido: error,
            mensaje: 'Hubo un error al guardar el ambiente'
        })
    })
}
const putAmbiente = (req, res) => {
    let { id_ambiente } = req.params;
    let { objAmbiente } = req.body;
    Ambiente.findByPk(id_ambiente).then(ambiente => {
        if (ambiente) {
            return Ambiente.update(objAmbiente, {
                where: { amb_id: id_ambiente }
            })
        } else {
            res.status(404).json({
                ok: false,
                contenido: null,
                mensaje: 'No se encontro el ambiente a actualizar'
            })
        }
    }).then(ambienteActualizado => {
        if (ambienteActualizado[0] === 1) {
            res.status(200).json({
                ok: true,
                contenido: ambienteActualizado,
                mensaje: 'Ambiente actualizado'
            })
        } else {
            res.status(200).json({
                ok: true,
                mensaje: 'Hubo un error al actualizar'
            })
        }
    })
}

module.exports = {
    getAmbienteWithPabellon,
    postAmbiente,
    putAmbiente
}