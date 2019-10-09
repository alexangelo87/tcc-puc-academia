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