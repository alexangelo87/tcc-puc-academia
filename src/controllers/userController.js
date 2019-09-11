const mongoose = require('mongoose');
const User = mongoose.model('User');
const md5 = require('md5');
const {authenticate} = require('../services/authService');

exports.get = async (req, res) => {
    try{
        let data  = await User.find({});
        res.status(200).send(data);
        console.log(data);
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
        let user = new User({
            roles: req.body.roles,
            email : req.body.email,
            senha : md5(req.body.senha + global.SALT_KEY)
        });
        await user.save();
        res.status(201).json({message : "Usuário cadastrado com sucesso"})
    }catch (error){
        res.status(500).json({message : `Erro ao salvar o usuário: ${error}`});
    } 
}

exports.postAuth = async (req, res) => {
    const response = await authenticate(req);
    res.status(response.statusCode).json(response.data);
}