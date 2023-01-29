const express = require('express');
const router = express.Router();
const jadwal = require('../services/jadwal');


router.get(
  '/', async function(req, res, next) {

    try {
      res.json(await jadwal.getJadwal());
    }
    catch (err) {
      console.error(`Error Ketika Mengambil Data Jadwal `, err.message);
      next(err);
    }
  }
);

module.exports = router;
