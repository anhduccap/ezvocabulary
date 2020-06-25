const express = require('express')
const router = express.Router()
const controller = require('../controllers/home.controllers')
const authMiddleware = require('../middlewares/auth.middlewares')

router.get('/delete/word/:id', authMiddleware.requireAuth,controller.deleteWord)
router.get('/about', authMiddleware.requireAuth,controller.about)
router.get('/deck', authMiddleware.requireAuth, controller.getDeck)
router.get('/deck/search', authMiddleware.requireAuth,controller.searchWord)
router.get('/add', authMiddleware.requireAuth,controller.getAdd)
router.post('/add', authMiddleware.requireAuth,controller.postAdd)
router.get('/word/:id', authMiddleware.requireAuth,controller.getEdit)
router.post('/word/:id', authMiddleware.requireAuth,controller.postEdit)
router.get('/study',authMiddleware.requireAuth, controller.study)
router.get('/studycontinue',authMiddleware.requireAuth, controller.nextStudy)


module.exports = router