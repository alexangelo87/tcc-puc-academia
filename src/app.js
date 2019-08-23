'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('../src/config');

//carrega os modelos
const Cliente = require('./models/cliente');

//conexao com o banco de dados
try {
  mongoose.connect(config.connectionString, { useNewUrlParser: true });
} catch(error) {
  console.log('Não foi possível conectar ao banco de dados.' + error);
}



const app = express();

//carrega as rotas
const indexRoute = require('./routes/indexRoute');
const clienteRoute = require('./routes/clienteRoute');



app.use(bodyParser.json({
    limit:'5mb'
}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    next();
});
//rotas
app.use('/', indexRoute);
app.use('/clientes', clienteRoute);

module.exports = app;