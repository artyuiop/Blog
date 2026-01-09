import express,{Express } from "express";
import path from "node:path";
import morgan from 'morgan'
const app: Express = express()


// import routes
import auth from './routes/auth'
import blog from './routes/blog'
import users from './routes/users'

// view engine
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/auth/', auth)
app.use('/blog/', blog)
app.use('/users/', users)

// page NotFound 404
app.use((req, res) => {
    res.json({message: "NotFound"})
    res.status(500)
})


app.listen(5000, () => console.log('RUNNNNNNNNNNNN'))