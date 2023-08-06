import Semester from "../models/semester.model.js";

const findAll = (req, res) => {
  Semester.getAll(
    (error, data) => {
      if (error) {
        res.status(500).json({ status: 500, message: `${error}` });
      }

      res.status(200).json({ status: 200, message: "Success!", data: data });
    }
  )
}

export { findAll };
