const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// connect to database
mongoose.connect('mongodb://localhost/DB1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Create Model
const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  password: String,
});
// Export Model
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('userInfo', User, 'userInfo');

