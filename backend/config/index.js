const dotenv = require("dotenv").config();

const port = process.env.PORT;
const connectionString = process.env.DBCONNECTION_STRING;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET  = process.env.REFRESH_TOKEN_SECRET;
const BACKEND_SERVER_PATH = process.env.BACKEND_SERVER_PATH

module.exports = {port,connectionString,ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET,BACKEND_SERVER_PATH}