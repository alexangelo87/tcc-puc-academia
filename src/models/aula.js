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
  // aluno: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Aluno"
  //   }
  // ],
  instrutor: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('Aula', schema);