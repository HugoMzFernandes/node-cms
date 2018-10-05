var controllers = require('../controllers')
var employee = require('../controllers/employee')

module.exports = function(app){
	app.get('/', controllers.index);
	app.get('/employees', employee.list);
};