import "dotenv/config";
import mysql from "mysql2";

const database = mysql.createPool(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
);

database.getConnection(
  (error) => {
    if (error) {
      throw error;
    }

    console.log("DB Connection Success!");
  }
)

export default database;
