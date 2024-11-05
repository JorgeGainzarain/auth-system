import express from 'express'
import AuthService from "./models/AuthService.js";

const router = express.Router()

router.get('/login', (req, res) => {
    res.render('login', { error: req.query.error || null });
});

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let logged = AuthService.signin(username, password)
    if (!logged) {
        return res.redirect('/login?error=Invalid username or password');
    }

    req.session.user = AuthService.users.get(username);
    res.redirect('/index');
})

router.get('/index', (req, res) => {
    let user = req.session["user"];

    if (!user) {
        return res.redirect('/login');
    }

    res.render('index', { user: user });
})

router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });

})

export default router