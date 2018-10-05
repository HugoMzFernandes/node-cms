module.exports = function(app){
	require('./site')(app);
	require('./admin')(app);
};
