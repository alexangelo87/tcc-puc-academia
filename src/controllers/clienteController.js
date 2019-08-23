const clienteRepository = require("../repositories/clienteRepository");

exports.get = async (req, res) => {
    try{
        let data  = await clienteRepository.get();
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
        console.log(req.body)
        await clienteRepository.create({
            nome : req.body.nome,
            identidade : req.body.identidade,
            cpf : req.body.cpf,
            endereco : req.body.endereco
        });
        res.status(201).json({message : "Cliente cadastrado com sucesso"})
    }catch (error){
        res.status(500).json({message : `Erro ao salvar o cliente: ${error}`});
    } 
}