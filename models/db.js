var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

mongoose.connect(process.env.DB_URL);

var employeeSchema = new Schema({
  name: String,
  address: String,
  phone: String,
  email: String
});

module.exports = mongoose.model('Employee', employeeSchema);
