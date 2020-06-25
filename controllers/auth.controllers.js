let User = require('../models/user')

module.exports.getLogin = (req, res) => res.render('auth/login')

module.exports.postLogin = (req, res) => {
  var emailReq = req.body.email
  var passwordReq = req.body.password
  User.find({}, (err, users) => {
    if (err) {
      console.log(err)
      return
    }
    else {
      var user = users.find(element => element.email === emailReq)
      if (!user) {
        res.render('auth/login', {
          errors: [
            'User does not exist.'
          ],
          values: req.body
        })
        return
      }


      if (user.password !== passwordReq) {
        res.render('auth/login', {
          errors: [
            'Wrong password.'
          ],
          values: req.body
        });
        return
      }
      res.cookie('userId', user.id)
      res.cookie('userEmail', user.email)
      res.cookie('count', 0)
      res.redirect('/deck')
    }
  })
}

module.exports.getRegister = (req, res) => res.render('auth/register')

module.exports.postRegister = (req, res) => {
  var errors = []
  if (!req.body.username) {
    errors.push('Name is required')
  }
  if (!req.body.email) {
    errors.push('Email is required')
  }
  if (!req.body.password) {
    errors.push('Password is required')
  }
  if (errors.length) {
    res.render('auth/register', { errors: errors, values: req.body })
    return 0
  }
  let user = new User()
  user.username = req.body.username
  user.email = req.body.email
  user.password = req.body.password
  
  user.save( (err) => {
    if(err) {
      console.log(err)
      return
    }
    else{
      res.redirect('/login')
    }
  })
}

module.exports.logout = (req, res) => {
  res.clearCookie('userEmail')
  res.clearCookie('userId')
  res.clearCookie('count')
  res.redirect('/login')
}