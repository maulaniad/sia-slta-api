import "dotenv/config";
import { createPool } from "mysql2";

const database = createPool(
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
      console.log("DB Connection Failed ...");
      throw error;
    }

    console.log("DB Connection Success!");
  }
);

export default database;
