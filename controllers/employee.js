/*
 * GET employees listing.
 */

var Employee = require('../models/db.js');

exports.list = function(req, res){
  Employee.find(function(err, employees) {
    // res.send(employees);
    // employees
    res.render('admin/index', { data: ['1', '2', '3'], title: "teste" });
  });
};
