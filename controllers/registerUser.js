import bcrypt from 'bcrypt'
import db from '../database.js'
import { getData, 
         insertDataOnReg,
         getLastIdFromRowTable,
         insertDataToForeignTable 
        } from '../database.js'
import { validationLogic, regExpDelivery } from '../utils/validation.js'
import { dateNow } from '../utils/customLogMsg.js'

const postRegisterPage = async (req, res) => {
    const sqlres = await getData();

    // test regexp against user data
    const regexp = regExpDelivery()
    const validation = validationLogic(req.body, regexp);
    const currentDate = dateNow();
    // if ok -> add data to db
    if(validation.every(el => el === false)){
        let { username, email, password } = req.body;
        let user = sqlres.find(u => u.username === username);
        // return if !user
        if (user){
            console.log(`${currentDate} User already exist!`)
            res.status(400).json('User already exist!')
            return
        }
            // hash pass with bcrypt, then send it to db
            const hash = await bcrypt.hash(password, 13);

            // add role 
            const role = 'user'

            // insert data to database!!!
            const addDataToUsersTable = await insertDataOnReg(db, username, email, hash, role);
            const getLastIdFromTableRow = await getLastIdFromRowTable(username);
            console.log(getLastIdFromTableRow)
            const addDataToTheSecondTable = await insertDataToForeignTable(getLastIdFromTableRow);
        // send a cookie && jwt
        res.status(200).json('OK')
        console.log(`${currentDate} Username ${username} successfully register!`)
    } else {
        console.log(req.body)
        console.log(`${currentDate} Data is incorrect, malformed, missing, or in some way unusable by the server.`)
        res.status(400).json('Data is incorrect, malformed, missing, or in some way unusable by the server.')

    }
}





export {postRegisterPage}