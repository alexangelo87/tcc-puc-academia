const mongoose = require('mongoose');
const Aluno = mongoose.model('Aluno');

exports.get = async (req, res) => {
    try{
        let data  = await Aluno.find({}).populate('user', 'id');
        res.status(200).send(data);
    }catch(error){
        res.status(500).send({
            message:"Erro ao processar sua requisição.",
            data:error
        });
    }
}

exports.getById = async (req, res) => {
    try {
        let aluno = await Aluno.findById(req.params.id);
        res.status(200).json(aluno);
    }catch(error) {
        res.status(500).send({
            message: "Erro ao processar sua requisição",
            data: error
        });
    }
}

exports.getUserAluno = async (req, res) => {
    try{
        let id = req.params.id;
        let data  = await Aluno.find({ user : { _id: id } })
        res.status(200).send(data);
    }catch(error){
        res.status(500).send({
            message:"Erro ao processar sua requisição.",
            data:error
        });
    }
}
    

exports.post = async (req, res) => {
    try {
        if(!req.body){
            throw 'body não definido';
        }
        console.log(req.body);
        let aluno = new Aluno({
            nome : req.body.nome,
            identidade : req.body.identidade,
            cpf : req.body.cpf,
            endereco : req.body.endereco,
            user : req.body.user
        });
        await aluno.save();
        res.status(201).json({message : "Aluno cadastrado com sucesso"})
    }catch (error){
        res.status(500).json({message : `Erro ao salvar o aluno: ${error}`});
    } 
}

exports.put = async (req, res) => {
    try{
        await Aluno.findOneAndUpdate(req.body.id, req.body, {new: true});
        res.status(200).json({
            message: "Aluno foi alterado com sucesso."
        });
    }catch(error) {
        res.status(500).json({message : `Erro ao alterar os dados do aluno: ${error}`});
    }
}

exports.delete = async (req, res) => {
    try{
        let response = await Aluno.findOneAndDelete({ _id: req.body.id });
        res.status(200).json({message : `${response.nome} excluido(a) com sucesso!`})
    }catch(error){
        res.status(500).json({message : `Erro ao exluir aluno: ${error}`});
    }
}

