/*
 * GET home page.
 */
var ModelUser = require('../../models/user.js');

exports.getLogin = (req, res) => {
  if( req.user ){
    res.redirect('/admin');
  } else {
    res.render('admin/login')
  }
}

exports.postLogin = (req, res, next) => {
  req.session.save((err) => {

    if( err ) {
      return next(err); 
    }

    res.redirect('/admin')
  })
}


exports.getLogout = (req, res, next) => {
  req.logout();
  req.session.save((err) => {
    
    if( err ) {
      return next(err);
    }

    console.log( req.user );

    res.redirect('/admin/login')
  })
}
