'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  nome: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  identidade: {
    type: String,
    required: true
  },
  atividade: {
    type: String,
    enum: ["musculacao", "grupo"],
    default: "musculacao"
  }
});

module.exports = mongoose.model('Instrutor', schema);