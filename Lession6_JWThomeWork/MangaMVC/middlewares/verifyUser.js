const jwt = require('jsonwebtoken');

const middlewareVerify = (req, res, next) => {
    const token = req.header('auth-token');

    console.log('Token from client: ', token);

    if(!token) return res.status(401).send('Forbbiden!!!');
    try{
        //Check token
        req.user = jwt.verify(token, 'thisissecretkeyandcannotbeleak');
        next();
    } catch(e) {
        res.status(400).send('Token incorrect!!');
    }
};

module.exports = middlewareVerify;