import express from 'express'
import { bookingTicket } from '../Controller/bookingController.js'
const bookingRouter = express.Router()

bookingRouter.post('/bookingticket',bookingTicket)


export {bookingRouter}