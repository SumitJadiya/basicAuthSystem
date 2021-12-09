const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName:  {
      type: String,
      default: null
    },
    lastName:  {
      type: String,
      default: null
    },
    email:  {
      type: String,
      unique: true
    },
  country:   String,
  password:   String,
  token:   String,
});

module.exports = mongoose.model('User', userSchema)