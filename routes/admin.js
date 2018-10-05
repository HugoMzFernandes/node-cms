var passport = require('passport');

var home = require('../controllers/admin');
var user = require('../controllers/admin/user');
var account = require('../controllers/admin/account');
var seo = require('../controllers/admin/seo');
var articles = require('../controllers/admin/articles');

function loggedIn(req, res, next) {
  if( req.user && !req.user.status ){
    res.redirect('/admin/logout');
  }else if ( req.user && req.user.status ) { 
    res.locals.userData = req.user;
    next();
  } else {
    res.redirect('/admin/login');
  }
}

function isAdmin(req, res, next) {

  if( req.user && (req.user.role != "dev" && req.user.role != "admin") ){
    res.redirect('/admin');
  } else {
    next();
  }
}


module.exports = function(app){
  // app.get('/admin', controllers.index);
  
  //home
  app.get('/admin', loggedIn, home.index);

  //GET:login
  app.route('/admin/login')
    .get(account.getLogin)
    .post(passport.authenticate('local', { failureRedirect: '/admin/login', failureFlash: true }), account.postLogin)

  //logout
  app.get('/admin/logout', account.getLogout);

  //users
  app.get('/admin/users', isAdmin, loggedIn, user.getAll);
  
  app.get('/admin/users/new', isAdmin, loggedIn, user.newUser);
  
  app.route('/admin/users/edit/:id')
    .get(isAdmin, loggedIn, user.get)
    .post(isAdmin, loggedIn, user.put);


  app.route('/admin/seo')
    .get(isAdmin, loggedIn, seo.get)

  app.route('/admin/articles')
    .get(isAdmin, loggedIn, articles.getAll)

  app.route('/admin/articles/edit/:id')
    .get(isAdmin, loggedIn, articles.get)

  app.route('/admin/articles/new')
    .get(isAdmin, loggedIn, articles.newArticle)
    .post(isAdmin, loggedIn, articles.post)

};
