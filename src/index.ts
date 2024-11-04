import express from 'express'
import path from 'path'
import authRoutes from './routes'

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Set EJS as the view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '..' , 'views'))

// Use the auth routes
app.use('/', authRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})