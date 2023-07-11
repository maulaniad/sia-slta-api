import "dotenv/config";
import mysql from "mysql2";

const database = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
);

database.connect(
  (error) => {
    if (error) {
      throw error;
    }

    console.log("DB Connection Success!");
  }
)

export default database;
