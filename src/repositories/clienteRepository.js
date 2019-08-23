const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

exports.create = async (data) => {
    let Cliente = new Cliente(data);
    await Cliente.save();
};

exports.get = async () => {
    return await Cliente.find({});
}