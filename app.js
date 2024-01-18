import express from 'express'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { check, validationResult} from 'express-validator'
import path from 'path'
import { fileURLToPath } from 'url'
import db from './database.js'
import { getData } from './database.js'

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


// Navigation
app.get('', async (req, res) => {
    // show db data on ejs page
    const sqlres = await getData();
    console.log(sqlres);
    res.render('index', {
        sqlres: sqlres
    })
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/hidden', (req, res) => {
    res.render('hidden')
})


app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/register', async (req, res) => {
    const sqlres = await getData();
    let { username, email, password } = req.body;
    let user = sqlres.find(u => u.username === username);
    // return if !user
    if (user){
        console.log('User already exist!')
        res.status(400).json('User already exist!')
        return
    }
    // hash pass with bcrypt, then send it to db
    const hash = await bcrypt.hash(password, 13);
    // insert data to database!!!
    let sql = `INSERT INTO users(username, email, password) VALUES (?,?,?)`;
    db.run(sql, [`${username}`, `${email}`, `${hash}`], 
    (err) => {
    if (err) return console.error(err.message);
    
    


    // send a cookie && jwt
    let loginresult = 'Success!';
    res.status(200).json('OK')
    console.log('it works!')
    console.log(loginresult)
})

    console.log(req.body)
    console.log(username)

})

// Send login data to server then compare with db data
 app.post('/login', async (req, res) => {
    
    const sqlres = await getData();

    let { username, password } = req.body;
    console.log(username, password);

    let user = sqlres.find(u => u.username === username);
    // return if !user
    if (!user){
        console.log('User doesn\'t exist!')
        res.status(400).json('User doesn\'t exist!')
        return
    }
    // compare pass with hash pass
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid){
        console.log('Wrong Password')
        res.status(402).json('Wrong Password')
        return
    }

    // send a cookie && jwt
    let loginresult = 'Success!';
    res.status(200).json('OK')
    console.log('it works!')
    console.log(loginresult)
    
})


app.listen(PORT, () => console.log(`Success on port ${PORT}`))