'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  tipoPagamento: {
    type: String,
    enum: ["mensal", "anual"],
    default: "mensal"
  },
  dataPagamentoRealizado: {
    type: String,
    required: false
  },
  dataProximoPagamento: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ["adimplente", "inadimplente"],
    default: "adimplente"
  },
  ferias: {
    type: Boolean,
    required: false
  },
  valor: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model('Pagamento', schema);