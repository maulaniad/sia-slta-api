import { sendFieldError } from "../helpers/error.js";
import Nilai from "../models/nilai.model.js";

const create = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ status: 400, message: "No body provided ..." });
  }

  const {
    tmt, tmtt, uts, uas, idSiswa, idGuru, idMapel
  } = req.body;

  if (!tmt)     { return sendFieldError("tmt", res); }
  if (!tmtt)    { return sendFieldError("tmtt", res); }
  if (!uts)     { return sendFieldError("uts", res); }
  if (!uas)     { return sendFieldError("uas", res); }
  if (!idSiswa) { return sendFieldError("idSiswa", res); }
  if (!idGuru)  { return sendFieldError("idGuru", res); }
  if (!idMapel) { return sendFieldError("idMapel", res); }

  const nilai = new Nilai({
    tmt: tmt,
    tmtt: tmtt,
    uts: uts,
    uas: uas,
    siswaId: idSiswa,
    guruId: idGuru,
    mapelId: idMapel,
  });

  Nilai.create(nilai, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    return res.status(201).json({
      status: 201,
      message: "Success!",
      data: nilai,
      records: data
    });
  });
}

const findAll = (req, res) => {
  const idKelas = req.params.id;

  Nilai.getAll(idKelas, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    if (data.length === 0) {
      return res.status(200).json({ status: 200, message: "Data empty ..." });
    }

    return res.status(200).json({ status: 200, message: "Success!", data: data });
  });
}

const findById = (req, res) => {
  const idSiswa = req.params.id;

  Nilai.getById(idSiswa, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    return res.status(200).json({ status: 200, message: "Success!", data: data });
  });
}

const update = (req, res) => {
  const { idSiswa, idMapel } = req.body;

  if (!idSiswa) { return sendFieldError("idSiswa", res); }
  if (!idMapel) { return sendFieldError("idMapel", res); }

  Nilai.getByIds(idSiswa, idMapel, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    if (data.length === 0) {
      return res.status(200).json({
        status: 200, message: "Data not found, therefore no action has been made ..."
      });
    }

    const currentNilaiData = data[0];
    const newData = new Nilai({
      tmt: currentNilaiData.tmt,
      tmtt: currentNilaiData.tmtt,
      uts: currentNilaiData.uts,
      uas: currentNilaiData.uas,
      siswaId: currentNilaiData.siswaId,
      guruId: currentNilaiData.guruId,
      mapelId: currentNilaiData.mapelId,
    });

    const {
      tmt, tmtt, uts, uas, idSiswa, idGuru, idMapel, idKelas
    } = req.body;
  
    if (tmt)     { newData.tmt = tmt; }
    if (tmtt)    { newData.tmtt = tmtt; }
    if (uts)     { newData.uts = uts; }
    if (uas)     { newData.uas = uas; }
    if (idSiswa) { newData.siswaId = idSiswa; }
    if (idGuru)  { newData.guruId = idGuru; }
    if (idMapel) { newData.mapelId = idMapel; }
    if (idKelas) { newData.kelasId = idKelas; }

    Nilai.update(idSiswa, idMapel, newData, (error, data) => {
      if (error) {
        return res.status(500).json({ status: 500, message: `${error.message}` });
      }

      return res.status(200).json(
        {
          status: 200, message: "Success!",
          before: currentNilaiData,
          after: newData,
          records: data
        }
      );
    });
  });
}

const deleteByIds = (req, res) => {
  const { idSiswa, idMapel } = req.body;

  Nilai.getByIds(idSiswa, idMapel, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    if (data.length === 0) {
      return res.status(200).json({
        status: 200, message: "Data not found, therefore no action has been made ..."
      });
    }

    const deletedData = data[0];

    Nilai.delete(idSiswa, idMapel, (error, data) => {
      if (error) {
        return res.status(500).json({ status: 500, message: `${error.message}` });
      }

      return res.status(200).json({
        status: 200, message: "Success!",
        deletedData: deletedData,
        records: data
      });
    });
  });
}

export { create, findAll, findById, update, deleteByIds };
