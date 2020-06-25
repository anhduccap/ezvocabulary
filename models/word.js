let mongoose = require('mongoose')

//user schema

let wordSchema = mongoose.Schema({
    wordName: {
        type: String,
        require: true
    },
    symbol: {
        type: String,
        require: true
    },
    VnMeaning: {
        type: String,
        require: true
    },
    EnMeaning: {
        type: String,
        require: false
    },
    difMean: {
        type: String,
        require: false
    },
    image: {
        type: String,
        require: false
    },
    userId: {
        type: String,
        require: true
    }
})

let Word = module.exports = mongoose.model('Word', wordSchema)