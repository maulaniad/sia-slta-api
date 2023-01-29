const db = require('./_db');
const helper = require('../helper');


const getJadwal = async (concentrationId = 'CON01') => {
  const rows = await db.query(
    `
      SELECT subjects.subject_name AS mapel, schedules.hours AS jam,
             days.day_name AS hari, teachers.name AS guru FROM subjects
      JOIN schedules ON schedules.id_subject = subjects.id_subject
      JOIN days ON days.id_day = schedules.id_day
      JOIN teachers ON teachers.id_teacher = schedules.id_teacher
      WHERE id_concentration = '${concentrationId}';
    `
  );

  const data = helper.emptyOrRows(rows);

  return {
    message: 'OK',
    data: data
  }
}

module.exports = {
  getJadwal
}
