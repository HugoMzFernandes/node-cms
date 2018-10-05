/*
 * GET home page.
 */

var ModelUser = require('../../models/user.js');

//lista usuários
exports.getAll = (req, res, next) => {
  
  ModelUser.find({}, function(err, users) {

    res.render('admin/users', {
      title: 'Usuários',
      users: users
    });

  });

};


exports.get = (req, res, next) => {

  var id = req.params.id || null;

  if( id ) {

    ModelUser.findById(id, function(err, users) {

      if( users ) {
        res.render('admin/users/edit', {
          title: 'Editar Usuário',
          user: users
        });
      } else {
        res.redirect('/admin/users');
      }

    });


  } else {
    res.redirect('admin/users');
  }

};

exports.newUser = (req, res, next) => {

  console.log(req.body);


  // if( id ) {

  //   ModelUser.findById(id, function(err, users) {

  //     res.render('admin/users/edit', {
  //       title: 'Editar Usuário',
  //       user: users
  //     });

  //   });


  // } else {
    res.render('admin/users/edit', {
      title: 'Novo Usuário'
    });
  // }

};



exports.put = (req, res, next) => {

  console.log(req.body);

  var id = req.params.id || null;

  // if( id ) {

  //   ModelUser.findById(id, function(err, users) {

  //     res.render('admin/users/edit', {
  //       title: 'Editar Usuário',
  //       user: users
  //     });

  //   });


  // } else {
    res.render('admin/users/edit');
  // }

};
