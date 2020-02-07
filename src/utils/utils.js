const jwt = require('jsonwebtoken');

// Middleware Validador wachiman
verificarToken = (token) => {
    try {
        // verificar si mi token cumple si aun vive, si es valida, si la contraseña concuerda, entre otras
        let data = jwt.verify(token, 'CodiGo', { algorithm: 'HS256' });
        return data;
    } catch (error) {
        return null;
    }
}

middleware = (req, res, next) => {
    // compruebo si me estan mandando por medio de los headers un campo authorization
    if (req.headers.authorization) {
        console.log(req.headers.authorization);
        let token = req.headers.authorization.split(' ')[1];
        console.log(token);    
        
        let resultado = verificarToken(token);
        if (resultado) {
            next();
        } else {
            res.status(401).json({
                ok: false,
                mensaje: 'No esta autorizado para realizar la solicitud'
            })
        }
    } else {
        res.status(401).json({
            ok: false,
            mensaje: 'Necesitas estar autenticado para realizar esta solicitud'
        })
    }
}

module.exports = {
    verificarToken,
    middleware
}