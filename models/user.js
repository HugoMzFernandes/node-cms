var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true },
    password: { type: String, required: true },
    register_date: { type: Date, default: Date.now },
    status: { type: Boolean, default: true }, 
    role: { type: String, default: 'editor' } //dev, admin, editor 
});


UserSchema.plugin(passportLocalMongoose);


UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);

  // bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
  //   if (err) return false;
  //   console.log(isMatch);
  //   return isMatch;
  // });
};

module.exports = mongoose.model('Users', UserSchema, 'user');
