import express from 'express'
import { bookingTicket } from '../Controller/bookingController.js'
const bookingRouter = express.Router()

bookingRouter.get('/bookingticket',bookingTicket)

export {bookingRouter}