const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nome: {type: String, required: true},
  sobrenome: {type: String, required: true},
  cpf: {type: Number, required: true},
  email: {type: String, required: true},
  senha: {type: String, required: true},
  isDeleted: {type: Boolean, default: false}
},{
  timestamp: true,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;