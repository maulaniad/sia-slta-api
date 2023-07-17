class RoleFormat {
  static ToString = "String";
  static ToID = "ID";
}

const convertRole = (role, format) => {
  if (format === RoleFormat.ToID) {
    if (!role) { return 0; }

    if (role.toLowerCase() === "admin") {
      return 1;
    }
  
    return 0;
  }

  if (role === 1) {
    return "admin";
  }

  return "siswa";
}

export { RoleFormat, convertRole };
