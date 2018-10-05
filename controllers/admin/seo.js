/*
 * GET setup page.
 */
// var ModelUser = require('../../models/user.js');

exports.get = (req, res) => {
  res.render('admin/seo')
}

// exports.postLogin = (req, res, next) => {
//   req.session.save((err) => {

//     if( err ) {
//       return next(err); 
//     }

//     res.redirect('/admin')
//   })
// }
