'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('../src/config');
const app = express();

//conexao com o banco de dados
mongoose.connect(config.connectionString, { useNewUrlParser: true });

//carrega os modelos
const Cliente = require('./models/cliente');

app.get('/', function (req, res) {
  res.send('TCC Puc Minas');
});

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

module.exports = app;