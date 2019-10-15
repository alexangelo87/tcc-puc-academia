'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('../src/config');

//carrega os modelos
const Users = require('./models/user');
const Aluno = require('./models/aluno');
const Instrutor = require('./models/instrutor');
const Aula = require('./models/aula');
const Presenca = require('./models/presenca');

//conexao com o banco de dados
try {
  mongoose.connect(config.connectionString, { useNewUrlParser: true });
} catch(error) {
  console.log('Não foi possível conectar ao banco de dados.' + error);
}

const app = express();

//carrega as rotas
const userRoute = require('./routes/userRoute');
const indexRoute = require('./routes/indexRoute');
const alunoRoute = require('./routes/alunoRoute');
const instrutorRoute = require('./routes/instrutorRoute');
const aulaRoute = require('./routes/aulaRoute');
const presencaRoute = require('./routes/presencaRoute');

app.use(bodyParser.json({
    limit:'5mb'
}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x_access_token");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    next();
});
//rotas
app.use('/', indexRoute);
app.use('/alunos', alunoRoute);
app.use('/users', userRoute);
app.use('/instrutores', instrutorRoute);
app.use('/aulas', aulaRoute);
app.use('/presencas', presencaRoute);

module.exports = app;