import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import routerExpress from './routes/index.js'
import './config/db.js';


const app = express()
const port = 3001

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api', routerExpress)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})