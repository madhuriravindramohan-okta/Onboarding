const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// connect to database
mongoose.connect('mongodb://localhost/DB1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Create Model
const Schema = mongoose.Schema;

const Client = new Schema({
  appName: String,
  clientName: String,
  secret: String,
  isTrusted: Boolean
});
// Export Model
Client.plugin(passportLocalMongoose);

module.exports = mongoose.model('clientInfo', Client, 'clientInfo');

