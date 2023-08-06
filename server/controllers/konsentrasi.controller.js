import Konsentrasi from "../models/konsentrasi.model.js";

const findAll = (req, res) => {
  Konsentrasi.getAll(
    (error, result) => {
      if (error) {
        return res.status(500).json({ status: 500, message: error });
      }

      return res.status(200).json({ status: 200, message: "Success!", data: result });
    }
  )
}

export { findAll };
