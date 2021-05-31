const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {

    // Get Token from header
    const token = req.header('x-auth-token');

    // check if not token
    if(!token) {
        return res.status(401).json({ msg: 'No token, Authorization Denied!' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.id = decoded.id;
        next();
        
    } catch (err) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
}