import database from "../config/db.js";

class Semester {
  constructor(semester) {
    this.idSemester = semester.idSemester;
    this.tingkatSemester = semester.tingkatSemester;
  }
}

Semester.getAll = (resultHandler) => {
  database.query(
    "SELECT idSemester, tingkatSemester FROM semester",
    (error, result) => {
      if (error) {
        console.log(`Error querying the DB ${error}`);
        resultHandler(error, null);
      }

      resultHandler(null, result);
    }
  );
}

export default Semester;
