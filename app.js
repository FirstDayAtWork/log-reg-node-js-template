import express from 'express'
import cookieParser from 'cookie-parser'
import { check, validationResult} from 'express-validator'
import path from 'path'
import { fileURLToPath } from 'url'
import pageRequests from './routes/pageRequests.js'

const app = express()
const pathcher = path
const PORT = 5000

// folder paths things
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser())
app.use(express.static(pathcher.join(__dirname, "public")))


// Set Template enginge
app.set('view engine', 'ejs')
app.set("views", pathcher.join(__dirname, "views"))

// const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.json())
// get data from TE (ejs) to the server
app.use(express.urlencoded({extended: true}))
app.use(pageRequests)




app.listen(PORT, () => console.log(`Success on port ${PORT}`))