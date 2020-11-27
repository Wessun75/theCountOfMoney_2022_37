const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
    
            const decrypt = await jwt.verify(bearerToken, 'secretkey',(err, decrypt) => {
            if (err) {
                    res.sendStatus(403);
            } else {
                    req.user = {
                        id: decrypt.findUser._id,
                        email: decrypt.findUser.email,
                        role : decrypt.findUser.role
                    }
                    next();
                }});
            } else {
                res.sendStatus(403)
            }
    } catch {
        res.sendStatus(403)
    }
};

module.exports = verifyToken;