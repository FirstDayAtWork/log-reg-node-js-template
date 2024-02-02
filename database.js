import sqlite3 from 'sqlite3';
// import { sendDataToDataBase} from "./app.js";

const sqlite = sqlite3.verbose();
let sql;


// connect to DB
const db = new sqlite.Database('./test.db', sqlite.OPEN_READWRITE,
(err) => {
    if (err) return console.error(err.message);
})

db.get("PRAGMA foreign_keys = ON", function(err){
    if(err){console.error(err.message)}
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

// query from foreign table
    // export async function getForeignData(){
    //     sql = `SELECT 
    //             username, 
    //             email,
    //             weapons,
    //             potions
    //            FROM 
    //             users 
    //            INNER JOIN inventory on inventory.id = users.id`
    //     return new Promise(function(resolve,reject){
    //         db.all(sql, function(err,rows){
    //            if(err){return reject(err);}
    //            resolve(rows);
    //          });
             
    //     });
        
    // }
    
    //  export const res = await getForeignData();
    // console.log(res);




// insert data on register
export async function insertDataOnReg(db, username, email, hash){
    let sql = `INSERT INTO users(username, email, password) VALUES (?,?,?)`;
    db.run(sql, [username, email, hash], 
    (err) => {
    if (err) return console.error(err.message);

    })
}

export async function insertDataToForeignTable(lastid){
    // insert data to the second table
    sql = `INSERT INTO inventory(weapons, armory, potions, id) VALUES (?,?,?,?)`;
    db.run(sql, ["test", "test2", "test3", lastid[0].id], 
    (err) => {
        if (err) return console.error(err.message);
    })

}


//select data from second table
export async function getDataFromSecTable(){
    sql = `SELECT *
           FROM 
            inventory `
    return new Promise(function(resolve,reject){
        db.all(sql, function(err,rows){
           if(err){return reject(err);}
           resolve(rows);
         });
         
    });
    
}

 export const ress = await getDataFromSecTable();
console.log(ress);


// query from both tables by id ?

// export async function getBothTables(){
//     return new Promise(function(resolve,reject){
//         db.all("SELECT username, armory FROM users INNER JOIN on inventory.id = users.id", function(err,rows){
//            if(err){return reject(err);}
//            resolve(rows);
//          });
         
//     });
    
// }

//  export const bothTableData = await getBothTables();
// console.log(bothTableData);

// Create Table
// sql = `CREATE TABLE users(id INTEGER PRIMARY KEY, username, email, password)`;
// db.run(sql);


// create table with foreign key
// sql = `CREATE TABLE inventory(inventory_id INTEGER PRIMARY KEY,
//      weapons, 
//      armory, 
//      potions, 
//      id INTEGER,
//      FOREIGN KEY (id) 
//      REFERENCES users (id) 
//         ON UPDATE CASCADE
//         ON DELETE CASCADE)`;
// db.run(sql);


// Insert data into table
// sql = `INSERT INTO users(username, email, password) VALUES (?,?,?)`;
// db.run(sql, ["Mike", "cockoverr@gmail.com", "123"], 
// (err) => {
//     if (err) return console.error(err.message);
// })


// // Insert data into second table
// sql = `INSERT INTO inventory(weapons, armory, potions, id) VALUES (?,?,?,?)`;
// db.run(sql, ["test", "test2", "test3", 12], 
// (err) => {
//     if (err) return console.error(err.message);
// })


// Drop table
// db.run("DROP TABLE inventory");


// update data
// sql = `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`;
// db.run(sql, ['Pasha', 'Doiki@mail.ru', '88005553535', 1], 
// (err) => {
//     if (err) return console.error(err.message);
// })


// // delete data (user)
// sql = `DELETE FROM users WHERE id = ?`;
// db.run(sql, [1], 
// (err) => {
//     if (err) return console.error(err.message);
// })


// create new column in existed table
// sql = `ALTER TABLE users ADD COLUMN group_id INTEGER`;
// db.run(sql,  
// (err) => {
// if (err) return console.error(err.message);
// })


// return last row id
export async function getLastIdFromRowTable(username){
    return new Promise(function(resolve,reject){
        db.all(`SELECT 
                    id 
                FROM 
                    users 
                WHERE username = ?`, [username], function(err,rows){
           if(err){return reject(err);}
           resolve(rows);
         });
         
    });
    
}


export default db;