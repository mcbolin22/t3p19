const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function databaseConnect(){

    // if (process.env.NODE_ENV == "production"){ // Use this for Production access
    //     databaseURL = process.env.DATABASE_URL_PROD
    // }
    
    let databaseURL = process.env.DATABASE_URL || "mongodb://localhost:27017/blogDB";

    await mongoose.connect(databaseURL);
    console.log("Database connecting completed!");
};

async function databaseClose(){
    // Disconnect from db
    await mongoose.connection.close();
    console.log("DB disconnected");
}

async function databaseClear(){
    // Delete all data in db
    await mongoose.connection.db.dropDatabase();
}

module.exports = {
    databaseConnect,
    databaseClose,
    databaseClear
}