import express from 'express'
import cors from 'cors'
import userRouter from './Router/userRouter.js'
import connectDB from './Config/dbConfig.js'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import adminRouter from './Router/adminRouter.js'
// import bodyParser from 'body-parser'
const app = express()

app.use(express.json())
app.use(cookieParser())
// app.use(bodyParser.json())
app.use(cors())
app.use('/api/v1/user',userRouter)
app.use('/api/v1/admin',adminRouter)
// app.use('/api/v1/movie',movieRouter)
// app.use('/api/v1/bookings'bookingRouter)
// app.use('/api/v1/Theater'theaterRouter)
// const port = 3000

connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(` listening to the port ${process.env.PORT}`)
})


