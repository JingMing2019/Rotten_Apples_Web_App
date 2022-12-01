import express from 'express'
import { findBookByKeyword, findBookDetailByID, saveGoogleBookBook } from '../controllers/googlebookSearchController.js'

const router = express.Router()

router.get('/businesses/search/:keyword', findBookByKeyword)

router.get('/businesses/:_id', findBookDetailByID)

router.route('/books').put(saveGoogleBookBook)

export default router