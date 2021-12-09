const User = require('./model/user')
User.pre('save', function(next) {
  // do stuff
  next();
});