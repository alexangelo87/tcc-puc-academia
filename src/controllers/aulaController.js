const mongoose = require('mongoose');
const Aula = mongoose.model('Aula');

exports.get = async (req, res) => {
    try{
        let data  = await Aula.find({});
        res.status(200).send(data);
    }catch(error){
        res.status(500).send({
            message:"Erro ao processar sua requisição.",
            data:error
        });
    }
}

exports.getById = async (req, res) => {
    try{
        let data = await Aula.findById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
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
        let aula = new Aula(req.body);
        await aula.save();
        res.status(201).json({message : "Aula cadastrada com sucesso"})
    } catch (error) {
        res.status(500).send({
            message:"Erro ao processar sua requisição.",
            data:error
        });
    }
}

exports.put = async (req, res) => {
    try{
        await Aula.findOneAndUpdate(req.body.id, req.body, {new: true});
        res.status(200).json({
            message: "Aula foi alterada com sucesso."
        });
    }catch(error) {
        res.status(500).json({message : `Erro ao alterar os dados da aula: ${error}`});
    }
}

exports.delete = async (req, res) => {
    try{
        let response = await Aula.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({message : `${response.nome} excluido(a) com sucesso!`});
    }catch(error){
        res.status(500).json({message : `Erro ao excluir aula: ${error}`});
    }
}

exports.deleteAll = async (req, res) => {
    try {
        await Aula.deleteMany({});
        res.status(200).json({message : `Todos as aulas excluidos com sucesso!`})
    } catch (error) {
        res.status(500).json({message : `Erro ao excluir aulas: ${error}`});
    }
}