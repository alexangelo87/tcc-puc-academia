"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  anamnese: {
    type: String,
    required: true
  },
  dobrasCutaneas: {
    type: String,
    required: true
  },
  exameErgometrico: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("AvaliacaoFisica", schema);
