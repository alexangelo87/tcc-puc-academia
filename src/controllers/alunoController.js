const mongoose = require('mongoose');
const Aluno = mongoose.model('Aluno');
const md5 = require('md5');

exports.get = async (req, res) => {
    try{
        let data  = await Aluno.find({});
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
        let aluno = new Aluno({
            nome : req.body.nome,
            identidade : req.body.identidade,
            cpf : req.body.cpf,
            endereco : req.body.endereco,
            email : req.body.email,
            senha : md5(req.body.senha + global.SALT_KEY)
        });
        await aluno.save();
        res.status(201).json({message : "Aluno cadastrado com sucesso"})
    }catch (error){
        res.status(500).json({message : `Erro ao salvar o aluno: ${error}`});
    } 
}

