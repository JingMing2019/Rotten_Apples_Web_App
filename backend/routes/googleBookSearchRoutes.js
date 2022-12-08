import express from 'express'
import { findBookByKeyword, findBookDetailByID, saveGoogleBook } from '../controllers/googlebookSearchController.js'

const router = express.Router()

router.get('/search/:keyword', findBookByKeyword)

router.get('/:_id', findBookDetailByID)

router.put('/books', saveGoogleBook)

export default router