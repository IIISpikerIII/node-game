exports.get = function(req, res, next) {
  res.render('game', { title: 'Game' });
};