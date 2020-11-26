const jwt = require('jsonwebtoken');
//import jwt from 'jsonwebtoken'; 
require("dotenv").config();


const generateToken = (findUser) => {
    const token = jwt.sign({findUser}, 'secretkey')
    return (token);
};

module.exports = generateToken;