const express = require('express');
const router = express.Router();
const siswa = require('../services/siswa');


router.get(
  '/', async function(req, res, next) {
    try {
      res.json(await siswa.getSiswa());
    }
    catch (err) {
      console.error("Error Mengambil Data siswa ", err.message);
      next(err);
    }
  }
);

router.get(
  '/:id', async function(req, res, next) {
    try {
      res.json(await siswa.getOneSiswa(req.params));
    }
    catch (err) {
      console.error("Error Mengambil Data siswa ", err.message);
      next(err);
    }
  }
);

router.post(
  '/', async function(req, res, next) {
    try {
      res.json(await siswa.createSiswa(req.body));
    }
    catch (err) {
      console.error("Gagal Menambahkan Data Siswa ", err.message);
      next(err);
    }
  }
)

router.put(
  '/:id', async function(req, res, next) {
    try {
      res.json(await siswa.updateSiswa(req.params, req.body));
    }
    catch (err) {
      console.error("Gagal Mengubah Data Siswa ", err.message);
      next(err);
    }
  }
)

router.delete(
  '/:id', async function(req, res, next) {
    try {
      res.json(await siswa.deleteSiswa(req.params));
    }
    catch (err) {
      console.error("Gagal Menghapus Data Siswa ", err.message);
      next(err);
    }
  }
)

module.exports = router;
