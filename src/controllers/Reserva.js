const { Reserva, Ambiente, Pabellon, Usuario } = require('./../config/Sequelize');
const { Op } = require('sequelize');

const postReserva = (req, res) => {
    let { objReserva } = req.body;
    // antes de crear la reserva ver si esta disponiblea ese ambiente y 
    // ver si el tipo de usuario que autoriza es de tipo 3 sino no me deja guardar
    Usuario.findOne({
        where: {
            usu_id: objReserva.usu_autoriza
        }
    }).then(usuario_autoriza => {
        if (usuario_autoriza.usu_tipo === 3) {
            Reserva.findAll({
                where: {
                    amb_id: objReserva.amb_id,
                    [Op.or]: [{
                        res_fechin: { [Op.between]: [objReserva.res_fechin, objReserva.res_fechfin] }
                    }, {
                        res_fechfin: { [Op.between]: [objReserva.res_fechin, objReserva.res_fechfin] }
                    }]
                }
            }).then(reservas => {
                if (reservas.length === 0) {
                    Reserva.build(objReserva).save().then(reservacreado => {
                        res.status(201).json({
                            ok: true,
                            contenido: reservacreado,
                            mensaje: 'Reserva creada exitosamente'
                        })
                    })
                } else {
                    res.status(400).json({
                        ok: false,
                        mensaje: 'ese ambiente ya se encuentra reservado en esas fechas'
                    })
                }
            })
        } else {
            res.status(401).json({
                ok: false,
                mensaje: 'El usuario no dispone de provilegios suficientes para reservar el aula'
            })
        }
    }).catch(error => {
        res.status(500).json({
            ok: false,
            contenido: error,
            mensaje: 'Hubo un error en ingresas la reserva'
        })
    })
}
const validarReserva = (req, res) => {
    let { fechin, fechfin, ambId } = req.params;
    Reserva.findAll({
        include: [{
            model: Ambiente,
            include: [{
                model: Pabellon
            }]
        }],
        where: {
            amb_id: ambId,
            [Op.or]: [{
                res_fechin: { [Op.between]: [fechin, fechfin] }
            }, {
                res_fechfin: { [Op.between]: [fechin, fechfin] }
            }]
        }
    }).then(reservas => {
        if (reservas) {
            res.status(200).json({
                ok: true,
                mensaje: 'Ya hay una reserva en esa fecha',
                contenido: reservas
            })
        }
        else {
            res.status(200).json({
                ok: true,
                mensaje: 'Ese ambiente se encuentra libre en esas horas'
            })
        }
    })
}
const getReservaByFecha = (req, res) => {
    let { fechin, fechfin } = req.params;
    Reserva.findAll({
        include: [{
            model: Ambiente,
            include: [{
                model: Pabellon
            }]
        }],
        where: {
            [Op.or]: [{
                res_fechin: { [Op.between]: [fechin, fechfin] }
            }, {
                res_fechfin: { [Op.between]: [fechin, fechfin] }
            }]
        }
    }).then(reservas => {
        if (reservas.length != 0) {
            res.status(200).json({
                ok: true,
                mensaje: 'Ya hay una reserva en esas fechas',
                contenido: reservas
            })
        }
        else {
            res.status(200).json({
                ok: true,
                mensaje: 'Ese ambiente se encuentra libre en esas horas'
            })
        }
    })
}
const getReserva = (req, res) => {
    Reserva.findAll().then(reservas => {
        res, status(200).json({
            ok: true,
            contenido: reservas,
            include: [{
                model: Ambiente
            }]

        })
    })
}
module.exports = {
    postReserva,
    validarReserva,
    getReservaByFecha
}
