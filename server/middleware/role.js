const admin = (req, res, next) => {
  if (req.user.role.toLowerCase() !== "admin") {
    return res.status(403).json(
      {
        status: 403,
        message: "Access denied ..."
      }
    );
  }

  next();
}

const siswa = (req, res, next) => {
  if (req.user.role.toLowerCase() !== "siswa") {
    if (req.user.role.toLowerCase() === "admin") {
      next();
      return;
    }

    return res.status(403).json(
      {
        status: 403,
        message: "Access denied ..."
      }
    );
  }

  next();
}

export { admin, siswa };
