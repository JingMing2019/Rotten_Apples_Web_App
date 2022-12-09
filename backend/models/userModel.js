import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { USER_ROLE_ADMIN, USER_ROLE_READER, USER_ROLE_WRITER } from '../constants/userConstant.js'
import arrayUniquePlugin from 'mongoose-unique-array'
import { bookSchema } from './bookModel.js'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [USER_ROLE_READER, USER_ROLE_WRITER, USER_ROLE_ADMIN],
      default: USER_ROLE_READER,
      required: true,
    },
    bio: {
      type: String,
      required: true,
      default: 'This user is too busy reading books to write a bio.'
    },
    location: {
      type: String,
      required: true,
      default: 'Boston'
    },
    likedBooks: [
      {
        title: { type: String, required: true },
        image_url: { type: String, required: true },
        book: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          unique: true,
          ref: 'Book',
        },
      }
    ],
    // ownedBooks: [
    //   {
    //       title: { type: String, required: true },
    //       image_url: { type: String, required: true },
    //       book: {
    //           type: mongoose.Schema.Types.ObjectId,
    //           required: true,
    //           unique: true,
    //           ref: 'Book',
    //       },
    //   }
    // ],

    ownedBooks: [bookSchema]
    // ownedBooks: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Book',
    // },
  },
  {
    timestamps: true,
  }
)

// check if the password matches
userSchema.methods.matchPassword = async function (enteredPassword) {
  // need to use function (instead of arrow function) here to use "this"
  return await bcrypt.compare(enteredPassword, this.password)
}

// encrypt password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// avoid array duplicate
userSchema.plugin(arrayUniquePlugin)

const User = mongoose.model('User', userSchema)

export default User