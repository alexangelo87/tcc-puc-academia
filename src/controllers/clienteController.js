const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');
const {authenticate} = require('../services/authService');
const md5 = require('md5');

exports.get = async (req, res) => {
    try{
        let data  = await Cliente.find({});
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message:"Erro ao processar sua requisição.",
            data:e
        });
    }
}

exports.post = async (req, res) => {
    try {
        if(!req.body){
            throw 'body não definido';
        }
        let cliente = new Cliente({
            nome : req.body.nome,
            identidade : req.body.identidade,
            cpf : req.body.cpf,
            endereco : req.body.endereco,
            email : req.body.email,
            senha : md5(req.body.senha + global.SALT_KEY)
        });
        await cliente.save();
        res.status(201).json({message : "Cliente cadastrado com sucesso"})
    }catch (error){
        res.status(500).json({message : `Erro ao salvar o cliente: ${error}`});
    } 
}

exports.postAuth = async (req, res) => {
    const response = await authenticate(req);
    res.status(response.statusCode).json(response.data);
}