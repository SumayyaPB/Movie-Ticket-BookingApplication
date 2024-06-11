import express from 'express'
import cors from 'cors'
import userRouter from './Router/userRouter.js'
import connectDB from './Config/dbConfig.js'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import adminRouter from './Router/adminRouter.js'
import { movieRouter } from './Router/movieRouter.js'
import { theaterRouter } from './Router/theaterRouter.js'
import { bookingRouter } from './Router/bookingRouter.js'
import { imageUploadRouter } from './Router/imageUploadRouter.js'
import { paymentRouter } from './Router/paymentRouter.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors())
app.use('/api/v1/user',userRouter);
app.use('/api/v1/admin',adminRouter);
app.use('/api/v1/movie',movieRouter);
app.use('/api/v1/theater',theaterRouter);
app.use('/api/v1/booking',bookingRouter);
app.use('/api/v1/upload',imageUploadRouter);
app.use('/api/v1/order',paymentRouter);


connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(` listening to the port ${process.env.PORT}`)
})


