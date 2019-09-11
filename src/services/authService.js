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
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

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
        const cliente = await User.findOne({
            email: req.body.email,
            senha : md5(req.body.senha + global.SALT_KEY)
        });

        if (!cliente) {
            return {
                statusCode: 404,
                data : {
                    message : "Usuário ou senha inválidos"
                }
            }
        }

        const token = await this.generateToken({
            id: cliente._id,
            email: cliente.email,
            nome: cliente.nome,
            //roles: customer.roles
        });

        return {
            statusCode : 201,
            data : {
                token: token,
                email: cliente.email,
                nome: cliente.nome
            }
        }
        // await res.status(201).json({
        //     token: token,
        //     data: {
        //         email: cliente.email,
        //         nome: cliente.nome
        //     }
        // });
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
        const customer = await this.getById(data.id);

        if (!customer) {
            res.status(404).send({
                message: "User não encontrado"
            });
        }

        const tokenData = await this.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });


        await res.status(201).send({
            token: tokenData,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: "Erro ao processar sua requisição.",
            data: e
        });
    }
};