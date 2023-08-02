var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.key
// var token = jwt.sign({ name: 'Dony Canra' }, JWT_SECRET);

const SignToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET);
}

//verify
const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    SignToken, verifyToken
}


