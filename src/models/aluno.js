'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    identidade: {
        type:String,
        required:true
    },
    cpf: {
        type:String,
        required:true
    },
    endereco: {
        type:String,
        required:true
    },
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Aluno', schema);