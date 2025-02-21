
import mysql from "mysql"
import constants from "../constants.js";

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:constants.DB_NAME
});
con.connect((err) =>{
    if(err){
        console.warn('DB Connection Failed', err)
    }else{
        // console.warn('DB Connected')
    }
});

export default con;