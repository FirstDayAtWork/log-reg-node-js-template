import sqlite3 from 'sqlite3';
// import { sendDataToDataBase} from "./app.js";

const sqlite = sqlite3.verbose();
let sql;



// connect to DB
const db = new sqlite.Database('./test.db', sqlite.OPEN_READWRITE,
(err) => {
    if (err) return console.error(err.message);
})


//query the data

    //    sql = ;
    export async function getData(){
        return new Promise(function(resolve,reject){
            db.all("SELECT * FROM users", function(err,rows){
               if(err){return reject(err);}
               resolve(rows);
             });
             
        });
        
    }
    
     export const result = await getData();
    console.log(result);



// Create Table
// sql = `CREATE TABLE users(id INTEGER PRIMARY KEY, username, email, password)`;
// db.run(sql);

// Insert data into table
// sql = `INSERT INTO users(username, email, password) VALUES (?,?,?)`;
// db.run(sql, ["Mike", "cockoverr@gmail.com", "123"], 
// (err) => {
//     if (err) return console.error(err.message);
// })


// Drop table
// db.run("DROP TABLE users");


// update data
// sql = `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`;
// db.run(sql, ['Pasha', 'Doiki@mail.ru', '88005553535', 1], 
// (err) => {
//     if (err) return console.error(err.message);
// })


// delete data (user)
// sql = `DELETE FROM users WHERE id = ?`;
// db.run(sql, [1], 
// (err) => {
//     if (err) return console.error(err.message);
// })

export default db;