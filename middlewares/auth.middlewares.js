let User = require('../models/user')

module.exports.requireAuth = (req, res, next) => {
    if (!req.cookies.userId) {
        res.redirect('/login')
        return
    }
    User.find({}, (err, users) => {
        if (err) {
            console.log(err)
            return
        }
        else {
            var user = users.find(element => element.id === req.cookies.userId)
            if (!user) {
                res.redirect('/login')
                return
            }
        
            next()
        }
    })

    
}