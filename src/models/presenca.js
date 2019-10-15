const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  dataPresenca: {
    type: String,
    required: true
  },
  horaPresenca: {
    type: String,
    required: false
  },
  aula: {
    type: String,
    required: true
  },
  aluno: {
    type: String,
    required: true
  },
  matriculaAluno: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Presenca', schema);