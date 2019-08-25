const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');
const {authenticate} = require('../services/authService');

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
        let cliente = new Cliente(req.body);
        await cliente.save();
        res.status(201).json({message : "Cliente cadastrado com sucesso"})
    }catch (error){
        res.status(500).json({message : `Erro ao salvar o cliente: ${error}`});
    } 
}

exports.postAuth = async (req, res) => {
    try{
        await authenticate(req, res);
    } catch(error){
        console.log(error)
    }
}