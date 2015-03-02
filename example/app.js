import express from 'express'
import destiny from 'express-destiny'

import pages from './routes/pages'
import api from './routes/api'

let app = express()

app.use(destiny({
  json: (req, res, next) =>

  html: (req, res, next) =>
}))

app.listen(3000)
