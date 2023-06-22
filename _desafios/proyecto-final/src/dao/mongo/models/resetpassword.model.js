const mongoose = require('mongoose');

const schemaOptions = {
  versionKey: false
};

const resetPasswordCollection = 'resetpassword'


const resetPasswordSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiration: {
    type: Date,
    expires: '60m',
    required: true,
    default: Date.now(),
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },

}, schemaOptions);

const resetPasswordModel = mongoose.model(resetPasswordCollection, resetPasswordSchema)

module.exports = { resetPasswordModel }
