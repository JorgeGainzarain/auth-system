import express from 'express'
import authRoutes from './routes.js'
import session from 'express-session';
import dotenv from 'dotenv';


dotenv.config();
const app = express()
const port = 3000

// Setup Session
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret_for_development',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(express.urlencoded({ extended: true }))

// Set EJS as the view engine
app.set('view engine', 'ejs')
app.set('views', './views')

// Use the auth routes
app.use('/', authRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})