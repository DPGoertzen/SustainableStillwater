var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var initiative = require('./initiative').schema;

var UserSchema = new Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  initiatives: [initiative], required: false
});

UserSchema.pre('save', function(next){
  var user = this;
  var SALT_WORK_FACTOR = 10;
  if(user.isModified('password') == false){
    return next();
  }
  bcrypt.hash(user.password, SALT_WORK_FACTOR, function(err, hash){
    if(err){
      console.log(err);
    }
    user.password = hash;
    return next();
  });
})

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  var user = this;

  bcrypt.compare(candidatePassword, user.password, function(err, isMatch){
    if(err){
      console.log(err);
      callback(err);
    }else{
      callback(null, isMatch);
    }
  });
}

module.exports = mongoose.model('User', UserSchema);
