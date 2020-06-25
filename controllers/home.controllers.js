let User = require('../models/user')
let Word = require('../models/word')
const e = require('express')


module.exports.getDeck = (req, res) => {
    Word.find({}, (err, words) => {
        if (err) {
            console.log(err)
            return
        }
        else {
            var userWords = words.filter((word) => {
                return word.userId.indexOf(req.cookies.userId) !== -1
            })
            res.render('home/deck', {
                words: userWords,
                userEmail: req.cookies.userEmail
            })
        }
    })
}

module.exports.searchWord = (req, res) => {
    Word.find({}, (err, words) => {
        if (err) {
            console.log(err)
            return
        }
        else {
            var userWords = words.filter((word) => {
                return word.userId.indexOf(req.cookies.userId) !== -1
            })
            var q = req.query.q
            var matchedWords = userWords.filter((word) => {
                return word.wordName.toLowerCase().indexOf(q.toLowerCase()) !== -1
            })
            res.render('home/deck', {
                userEmail: req.cookies.userEmail, words: matchedWords
            })
        }
    })
}

module.exports.getAdd = (req, res) => res.render('home/add')

module.exports.postAdd = (req, res) => {
    var errors = []
    if (!req.body.wordName) {
        errors.push('Name is required')
    }
    if (!req.body.VnMeaning) {
        errors.push('Vietnamese meaning is required')
    }
    if (!req.body.EnMeaning) {
        errors.push('English meaning is required')
    }
    if (errors.length) {
        res.render('home/add', { errors: errors, values: req.body })
        return 0
    }

    let word = new Word()
    word.wordName = req.body.wordName
    word.symbol = req.body.symbol
    word.VnMeaning = req.body.VnMeaning
    word.EnMeaning = req.body.EnMeaning
    word.difMean = req.body.difMean
    word.image = req.body.image
    word.userId = req.cookies.userId

    word.save((err) => {
        if (err) {
            console.log(err)
            return
        }
        else {
            res.redirect('/deck')
        }
    })
}

module.exports.about = (req, res) => res.render('home/about')

module.exports.getEdit = (req, res) => {
    Word.findById(req.params.id, (err, wordMatched) => {
        if (err) {
            console.log(err)
            return
        }
        else {
            res.render('home/edit', { word: wordMatched })
        }
    })
}

module.exports.postEdit = (req, res) => {
    var errors = []
    if (!req.body.wordName) {
        errors.push('Name is required')
    }
    if (!req.body.VnMeaning) {
        errors.push('Vietnamese meaning is required')
    }
    if (!req.body.EnMeaning) {
        errors.push('English meaning is required')
    }
    if (errors.length) {
        res.render('home/add', { errors: errors, values: req.body })
        return 0
    }

    let word = {}
    word.wordName = req.body.wordName
    word.symbol = req.body.symbol
    word.VnMeaning = req.body.VnMeaning
    word.EnMeaning = req.body.EnMeaning
    word.difMean = req.body.difMean
    word.image = req.body.image
    word.userId = req.cookies.userId

    let query = { _id: req.params.id }

    Word.update(query, word, (err) => {
        if (err) {
            console.log(err)
            return
        }
        else {
            res.redirect('/deck')
        }
    })
}

module.exports.study = (req, res) => {
    Word.find({}, (err, words) => {
        if (err) {
            console.log(err)
            return
        }
        else {
            var userWords = words.filter((word) => {
                return word.userId.indexOf(req.cookies.userId) !== -1
            })
            var count = parseInt(req.cookies.count)
            res.render('home/study', { word: userWords[count] })
        }
    })
}

module.exports.nextStudy = (req, res) => {
    Word.find({}, (err, words) => {
        if (err) {
            console.log(err)
            return
        }
        else {
            var userWords = words.filter((word) => {
                return word.userId.indexOf(req.cookies.userId) !== -1
            })

            var userWordsWithout0 = userWords.splice(0, 1)

            var count = parseInt(req.cookies.count) + 1

            if (count === userWords.length + 1) {
                res.clearCookie('count')
                res.cookie('count', 0)
                res.redirect('/deck')
            }
            else {
                res.render('home/study', { word: userWordsWithout0[count] })
                res.clearCookie('count')
                res.cookie('count', count)
                res.redirect('/study')
            }
        }
    })
}

module.exports.deleteWord = (req, res) => {
    Word.remove({_id:req.params.id}, (err) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/deck')
    })
}
