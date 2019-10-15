const mongoose = require('mongoose');
const Presenca = mongoose.model('Presenca');

exports.get = async (req, res) => {
    try{
        let data  = await Presenca.find({});
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
        let data = await Presenca.findById(req.params.id);
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
        let aula = new Presenca(req.body);
        await aula.save();
        res.status(201).json({message : "Presenca cadastrada com sucesso"})
    } catch (error) {
        res.status(500).send({
            message:"Erro ao processar sua requisição.",
            data:error
        });
    }
}

exports.put = async (req, res) => {
    try{
        await Presenca.findOneAndUpdate(req.body.id, req.body, {new: true});
        res.status(200).json({
            message: "Presenca foi alterada com sucesso."
        });
    }catch(error) {
        res.status(500).json({message : `Erro ao alterar presença: ${error}`});
    }
}

exports.delete = async (req, res) => {
    try{
        let response = await Presenca.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({message : `Presenca excluido(a) com sucesso!`});
    }catch(error){
        res.status(500).json({message : `Erro ao excluir : ${error}`});
    }
}

exports.deleteAll = async (req, res) => {
    try {
        await Presenca.deleteMany({});
        res.status(200).json({message : `Todos as aulas excluidos com sucesso!`})
    } catch (error) {
        res.status(500).json({message : `Erro ao excluir aulas: ${error}`});
    }
}