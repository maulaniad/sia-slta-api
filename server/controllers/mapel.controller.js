import Mapel from "../models/mapel.model.js";
import { sendFieldError } from "../helpers/error.js";

const create = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ status: 400, message: "No body provided ..." });
  }

  const { namaMapel, jam, hari, idKelas, idSemester } = req.body;

  if (!namaMapel)  { return sendFieldError("namaMapel", res); }
  if (!jam)        { return sendFieldError("jam", res); }
  if (!hari)       { return sendFieldError("hari", res); }
  if (!idKelas)    { return sendFieldError("idKelas", res); }
  if (!idSemester) { return sendFieldError("idSemester", res); }

  const mapel = new Mapel({
    namaMapel: namaMapel,
    jam: jam,
    hari: hari,
    kelasId: idKelas,
    semesterId: idSemester
  });

  Mapel.create(mapel, (error, data) => {
    if (error) {
      res.status(500).json({ status: 500, message: `${error.message}` });
    }

    return res.status(201).json({
      status: 201,
      message: "Success!",
      data: mapel,
      records: data
    });
  });
}

const findAll = (req, res) => {
  Mapel.getAll((error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    return res.status(200).json({ status: 200, message: "Success!", data: data });
  });
}

const findById = (req, res) => {
  const id = req.params.id;

  Mapel.getById(
    id, (error, result) => {
      if (error) {
        return res.status(500).json({ status: 500, message: `${error.message}` });
      }

      return res.status(200).json(
        {
          status: 200,
          message: "Success!",
          data: result[0]
        }
      );
    }
  );
}

const update = (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res.status(400).json({ status: 400, message: "No body provided ..." });
  }

  Mapel.getById(id, (error, result) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    const { namaMapel, jam, hari, idKelas, idSemester } = req.body;
    const currentMapelData = result[0];
    const newMapel = new Mapel({
      namaMapel: namaMapel,
      jam: jam,
      hari: hari,
      kelasId: idKelas,
      semesterId: idSemester
    });

    if (!namaMapel) { newMapel.namaMapel = currentMapelData.namaMapel }
    if (!jam)       { newMapel.jam = currentMapelData.jam }
    if (!hari)      { newMapel.hari = currentMapelData.hari }

    Mapel.update(id, newMapel, (error, data) => {
      if (error) {
        res.status(500).json({ status: 500, message: `${error.message}` });
      }

      return res.status(201).json({
        status: 201,
        message: "Success!",
        before: currentMapelData,
        after: newMapel,
        records: data
      });
    });
  });
}

const deleteById = (req, res) => {
  const id = req.params.id;

  Mapel.getById(id, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    if (data.length === 0) {
      return res.status(200).json({
        status: 200, message: "Data not found, therefore no action has been made ..."
      });
    }

    const deletedMapelData = data[0];

    Mapel.delete(id, (error, data) => {
      if (error) {
        return res.status(500).json({ status: 500, message: `${error.message}` });
      }

      return res.status(200).json({
        status: 200, message: "Success!",
        deletedData: deletedMapelData,
        records: data
      });
    });
  });
}

export { create, findAll, findById, update, deleteById };
