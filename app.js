import express from 'express'
import { check, validationResult} from 'express-validator'
import cookieParser from 'cookie-parser'
import path from 'path'
import 'dotenv/config'
import { fileURLToPath } from 'url'
import pageRequests from './routes/pageRequests.js'
import streamVideo from './routes/streamVideo.js'
import authPages from './routes/authPages.js'
import crypto from 'crypto'

const app = express()
const pathcher = path
const creepto = crypto
const PORT = 5000

// folder paths things
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser(process.env.ACCESS_TOKEN_SECRET))
app.use(express.static(pathcher.join(__dirname, "public")))


// Set Template enginge
app.set('view engine', 'ejs')
app.set("views", pathcher.join(__dirname, "views"))

// const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.json())
// get data from TE (ejs) to the server
app.use(express.urlencoded({extended: true}))
app.use(pageRequests)
app.use(streamVideo)
app.use(authPages)
// const generateToken = async (c) => {
//     const hex = await c.randomBytes(64).toString('hex');
//     console.log(hex)
//     return hex
// }

// generateToken(creepto)

app.listen(PORT, () => console.log(`Success on port ${PORT}`))