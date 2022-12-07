import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const connect = await mongoose.connect('mongodb+srv://jingming:h7t44sONVRlFrW1R@cluster0.kvlufkb.mongodb.net/RottenApple?retryWrites=true&w=majority')
    //const connect = await mongoose.connect('mongodb://localhost:27017/rotten_apples')
    console.log(`Connected to database: ${connect.connection.host}`)
  } catch (error) {
    console.log(`Connection failed: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB