/*
 * GET setup page.
 */
// var ModelUser = require('../../models/user.js');

var ModelArticle = require('../../models/article.js');

exports.getAll = (req, res) => {

  ModelArticle.find({}, function(err, articles) {
    res.render('admin/articles', {
      title: 'Artigos',
      articles: articles
    });
  });
};

exports.get = (req, res) => {

  var id = req.params.id || null;

  if( id ) {

    ModelArticle.findById(id, function(err, articles) {

      if( articles ) {
        res.render('admin/articles/edit', {
          articles: articles
        });
      } else {
        res.redirect('admin/articles/new');
      }

    });


  } else {
    res.redirect('admin/articles');
  }

};

exports.newArticle = (req, res) => {
  res.render('admin/articles/new', {
    title: 'Novo artigo'
  });
};

exports.post = (req, res, next) => {
  var article = new ModelArticle(req.body);
  
  article.save(function(err) {
    if (err) {
      return next(err);
    }
    else {
      res.redirect('/admin/articles');
    }
});
}


// exports.postLogin = (req, res, next) => {
//   req.session.save((err) => {

//     if( err ) {
//       return next(err); 
//     }

//     res.redirect('/admin')
//   })
// }
