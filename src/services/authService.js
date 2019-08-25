'use strict'
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

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
exports.authenticate = async (req, res) => {
    try {
        const cliente = await Cliente.findOne
        ({
            email: req.body.email,
            senha : req.body.senha
            // password: md5(req.body.password + global.SALT_KEY)
        });

        if (!cliente) {
            res.status(404).json({
                message: "Usuário ou senha inválidos"
            });
        }

        const token = await this.generateToken({
            id: cliente._id,
            email: cliente.email,
            nome: cliente.nome,
            //roles: customer.roles
        });


        await res.status(201).json({
            token: token,
            data: {
                email: cliente.email,
                nome: cliente.nome
            }
        });
    } catch (e) {
        res.status(500).json({
            message: "Erro ao processar sua requisição.",
            data: e
        });
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
                message: "Cliente não encontrado"
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