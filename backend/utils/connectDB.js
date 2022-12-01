import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/tuiter')
    console.log(`Connected to database: ${conn.connection.host}`)
  } catch (error) {
    console.log(`Connection failed: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB