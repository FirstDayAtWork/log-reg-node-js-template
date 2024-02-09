import bcrypt from 'bcrypt'
import db from '../database.js'
import { getData, 
         insertDataOnReg,
         getLastIdFromRowTable,
         insertDataToForeignTable 
        } from '../database.js'
import { validationLogic, regExpDelivery } from '../utils/validation.js'

const postRegisterPage = async (req, res) => {
    const sqlres = await getData();

    // test regexp against user data
    const regexp = regExpDelivery()
    const validation = validationLogic(req.body, regexp);
    // if ok -> add data to db
    if(validation.every(el => el === false)){
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

            // add role 
            const role = 'user'

            // insert data to database!!!
            const addDataToUsersTable = await insertDataOnReg(db, username, email, hash, role);
            const getLastIdFromTableRow = await getLastIdFromRowTable(username);
            console.log(getLastIdFromTableRow)
            const addDataToTheSecondTable = await insertDataToForeignTable(getLastIdFromTableRow);
        // send a cookie && jwt
        let loginresult = 'Success!';
        res.status(200).json('OK')
        console.log('it works!')
        console.log(loginresult)
        console.log(username)
    } else {
        console.log(req.body)
        console.log('Data is incorrect, malformed, missing, or in some way unusable by the server.')
        res.status(400).json('Data is incorrect, malformed, missing, or in some way unusable by the server.')

    }
}





export {postRegisterPage}