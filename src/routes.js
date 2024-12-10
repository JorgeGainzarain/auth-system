import express from 'express'
import AuthService from "./models/AuthService.js";

const router = express.Router()

router.get('/', (req, res) => {
    res.redirect('/index');
});

router.get('/login', (req, res) => {
    res.render('login', { error: req.query.error || null });
});

router.get('/signup', (req, res) => {
    res.render('signup', { error: req.query.error || null });
});

router.post('/signup', (req, res) => {
    let username = req.body.username;
    let fullName = req.body.fullName;
    let password = req.body.password;

    let signed = AuthService.signup(username, fullName, password)
    if (!signed) {
        return res.redirect('/signup?error=Username already taken');
    }

    res.redirect('/login');
})

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let logged = AuthService.signin(username, password)
    if (!logged) {
        return res.redirect('/login?error=Invalid username or password');
    }

    req.session["user"] = AuthService.users.get(username);
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