'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  conteudo: {
      type: String,
      required: true,
  }
});

module.exports = mongoose.model('Relatorio', schema);