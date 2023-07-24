import { sendFieldError } from "../helpers/error.js";
import Nilai from "../models/nilai.model.js";

const create = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ status: 400, message: "No body provided ..." });
  }

  const {
    tmt, tmtt, uts, uas, siswaId, guruId, mapelId
  } = req.body;

  if (!tmt)     { return sendFieldError("tmt", res); }
  if (!tmtt)    { return sendFieldError("tmtt", res); }
  if (!uts)     { return sendFieldError("uts", res); }
  if (!uas)     { return sendFieldError("uas", res); }
  if (!siswaId) { return sendFieldError("siswaId", res); }
  if (!guruId)  { return sendFieldError("guruId", res); }
  if (!mapelId) { return sendFieldError("mapelId", res); }

  const nilai = new Nilai({
    tmt: tmt,
    tmtt: tmtt,
    uts: uts,
    uas: uas,
    siswaId: siswaId,
    guruId: guruId,
    mapelId: mapelId,
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
  const { idSiswa, idMapel, idSemester } = req.body;

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
      kelasId: currentNilaiData.kelasId
    });

    const {
      tmt, tmtt, uts, uas, siswaId, guruId, mapelId, kelasId
    } = req.body;
  
    if (tmt)     { newData.tmt = tmt; }
    if (tmtt)    { newData.tmtt = tmtt; }
    if (uts)     { newData.uts = uts; }
    if (uas)     { newData.uas = uas; }
    if (siswaId) { newData.siswaId = siswaId; }
    if (guruId)  { newData.guruId = guruId; }
    if (mapelId) { newData.mapelId = mapelId; }
    if (kelasId) { newData.kelasId = kelasId; }

    Nilai.update(idSiswa, idMapel, idSemester, newData, (error, data) => {
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
  const { idSiswa, idMapel, idSemester } = req.body;

  Nilai.getByIds(idSiswa, idMapel, idSemester, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    if (data.length === 0) {
      return res.status(200).json({
        status: 200, message: "Data not found, therefore no action has been made ..."
      });
    }

    const deletedData = data[0];

    Nilai.delete(idSiswa, idMapel, idSemester, (error, data) => {
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
