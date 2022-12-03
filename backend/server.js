import express from 'express'
import dotenv from 'dotenv'
import connectDB from './utils/connectDB.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import bookRoutes from './routes/bookRoutes.js'
import googleBookSearchRoutes from './routes/googleBookSearchRoutes.js'
import path from 'path'

dotenv.config()

const app = express()

// handle json body
app.use(express.json())

app.use('/api/users', userRoutes)

app.use('/api/books', bookRoutes)

app.use('/api/google', googleBookSearchRoutes)

const PORT = process.env.PORT || 4000

connectDB().then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)));

// deployment
// get the current root path
const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
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

// If reach here, raise not found error
app.use(notFound)

// handle error
app.use(errorHandler)