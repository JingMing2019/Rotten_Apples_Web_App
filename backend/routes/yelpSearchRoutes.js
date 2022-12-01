import express from 'express'
import { findResByKeyword, findResDetailByID, saveYelpRestaurant } from '../controllers/yelpSearchController.js'

const router = express.Router()

router.get('/businesses/search/:keyword', findResByKeyword)

router.get('/businesses/:_id', findResDetailByID)

router.route('/restaurants').put(saveYelpRestaurant)

export default router