/*
 * GET home page.
 */
exports.index = function(req, res){
  console.log(req.user)
  res.render('admin/index', { 
    title: 'Admin Website',
    userData: req.user
  });
};
