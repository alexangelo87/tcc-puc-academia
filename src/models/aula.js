'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  nome: {
    type: String,
    required: true
  },
  horarioInicio: {
    type: String,
    required: true
  },
  horarioFim: {
    type: String,
    required: true
  },
  alunos: [],
  instrutor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instrutor"
    }
  ]
});

module.exports = mongoose.model('Aula', schema);