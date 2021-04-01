const Jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({
            status: 401,
            message: 'Access Denied.',
            data: {},
        })
    }
    try {
        const verified = Jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err.message,
            data: {},
        })
    }
}

module.exports = auth;