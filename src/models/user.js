'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  roles: []
});

module.exports = mongoose.model('User', schema);