import express from 'express'

const router = express.Router()

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {

})

export default router