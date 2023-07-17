import moment from "moment";

class DateFormat {
  constructor(format) {
    this.value = format
  }

  static FromMysql = new DateFormat("DD-MM-YYYY");
  static ToMysql = new DateFormat("YYYY-MM-DD");

  toString = () => {
    return `${this.value}`;
  }
}

const convertDate = (mysqlDate, format) => {
  const convertedDate = moment.utc(mysqlDate).toDate();

  return moment(convertedDate).format(format);
}

export { DateFormat, convertDate };
