const mongoose = require('mongoose');
const Instrutor = mongoose.model('Instrutor');
exports.get = async (req, res) => {
    try{
        let data  = await Instrutor.find({}).populate('user', 'nome');
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
        let instrutor = await Instrutor.findById(req.params.id);
        res.status(200).json(instrutor);
    }catch(error) {
        res.status(500).send({
            message: "Erro ao processar sua requisição",
            data: error
        });
    }
}

exports.post = async (req, res) => {
    try {
        if(!req.body){
            throw 'body não definido';
        }
        console.log(req.body);
        let instrutor = new Instrutor(req.body);
        await instrutor.save();
        res.status(201).json({message : "Instrutor cadastrado com sucesso"})
    }catch (error){
        res.status(500).json({message : `Erro ao salvar o instrutor: ${error}`});
    } 
}

exports.put = async (req, res) => {
    try{
        await Instrutor.findOneAndUpdate(req.body.id, req.body, {new: true});
        res.status(200).json({
            message: "Instrutor foi alterado com sucesso."
        });
    }catch(error) {
        res.status(500).json({message : `Erro ao alterar os dados do aluno: ${error}`});
    }
}

exports.delete = async (req, res) => {
    try{
        let response = await Instrutor.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({message : `${response.nome} excluido(a) com sucesso!`});
    }catch(error){
        res.status(500).json({message : `Erro ao excluir aluno: ${error}`});
    }
}

exports.deleteAll = async (req, res) => {
    try {
        await Instrutor.deleteMany({});
        res.status(200).json({message : `Todos os alunos excluidos com sucesso!`})
    } catch (error) {
        res.status(500).json({message : `Erro ao excluir alunos: ${error}`});
    }
}