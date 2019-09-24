'use strict'
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
    return await jwt.verify(token, global.SALT_KEY);
}

exports.authorize = function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        res.status(401).json({ message: "Acesso restrito!" });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error) {
            if (error) {
                res.status(401).json({ message: "Token inválido" });
            } else {
                next();
            }
        });
    }
}

exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({ message: "Acesso restrito!" });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({ message: "Token inválido" });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({ message: "Área restria a administradores." });
                }
            }
        });
    }
}

//authenticate
exports.authenticate = async (req) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            senha : md5(req.body.senha + global.SALT_KEY)
        });

        if (!user) {
            return {
                statusCode: 404,
                data : {
                    message : "Usuário ou senha inválidos"
                }
            }
        }

        const token = await this.generateToken({
            id: user._id,
            email: user.email,
            nome: user.nome,
            roles: user.roles
        });

        return {
            statusCode : 201,
            data : {
                token: token,
                email: user.email,
                nome: user.nome
            }
        }
    } catch (error) {
        return {
            statusCode: 500,
            data : {
                message : error
            }
        };
    }
};

//refreshToken
exports.refreshToken = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await this.decodeToken(token);
        const user = await this.getById(data.id);

        if (!user) {
            res.status(404).send({
                message: "User não encontrado"
            });
        }

        const tokenData = await this.generateToken({
            id: user._id,
            email: user.email,
            name: user.name,
            roles: user.roles
        });


        await res.status(201).send({
            token: tokenData,
            data: {
                email: user.email,
                name: user.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: "Erro ao processar sua requisição.",
            data: e
        });
    }
};