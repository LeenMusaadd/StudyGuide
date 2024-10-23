// Ckeck Authentication 
exports.isLoggedIn = function (req, res, next) {
  if(req.user) {
    next();
  } else {
    return res.status(401).send('Access Denied');// Prevent the users to access admin page if they did not login 
  }
}