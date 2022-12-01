import express from 'express'
import dotenv from 'dotenv'
import connectDB from './utils/connectDB.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'
import userRoute from './routes/userRoutes.js'
import restaurantRoutes from './routes/restaurantRoutes.js'
import yelpSearchRoutes from './routes/yelpSearchRoutes.js'
import path from 'path'

dotenv.config()

connectDB()

const app = express()

// handle json body
app.use(express.json())


app.use('/api/users', userRoute)

app.use('/api/restaurants', restaurantRoutes)

app.use('/api/yelp', yelpSearchRoutes)

// deployment
// get the current root path
const __dirname = path.resolve()

if (process.env.NODE_ENV = 'production') {
  // server files in /frontend/build
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  console.log(path)
  // for other url, go to index.html
  app.get('/*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
  // handler for index
  app.get('/', (req, res) => res.send('Hello World!')
  )
}

// if goes here, raise not found error
app.use(notFound)

// handle error
app.use(errorHandler)


const PORT = process.env.PORT || 4000

app.listen(PORT)