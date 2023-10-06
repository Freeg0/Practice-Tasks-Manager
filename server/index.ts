import { config } from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
  config()
}
import express from 'express'
import pg from 'pg'
import passport from 'passport'
import flash from 'express-flash'
import session from 'express-session'
import methodOverride from 'method-override'
import getTasks from './src/tasks/getTasks'
import createTask from './src/tasks/createTask'
import deleteTask from './src/tasks/deleteTask'
import createUser from './src/users/createUser'
import initializePassport from './passport-config'
import { getUserByUsername, getUserById } from './src/users/getUser'

const pool = new pg.Pool({
  user: 'julien',
  host: 'localhost',
  database: 'taskmanagement',
  password: 'password',
  port: 5432,
})
const app = express()

initializePassport(
  passport,
  (username) => getUserByUsername(pool)({ username }),
  (id) => getUserById(pool)({ id })
)

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard')
  }
  next()
}

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/')
}

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_, response) => {
  response.send("it's working")
})

// TASKS ROUTES
app.get('/tasks', getTasks(pool))
app.post('/task', createTask(pool))
app.delete('/task/:id', deleteTask(pool))

// USERS ROUTES
app.post('/user', createUser(pool))
app.post(
  '/login',
  checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true,
  })
)
app.post('/isAuth', checkAuthenticated)

// app.delete('/logout', (req, res) => {
//   req.logOut()
//   res.redirect('/login')
// })

app.listen(3000, () => console.log('API server is running...'))
