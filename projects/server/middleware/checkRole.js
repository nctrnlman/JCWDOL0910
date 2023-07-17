require("dotenv").config({
  path: ".env.local",
});
const { db, query } = require("../database");
const { getIdFromToken } = require("../helper/jwt-payload");

const superAdmin = async (req, res, next) => {
  try {
    const adminId = getIdFromToken(req, res);
    const getAdminRoleQuery = `
        SELECT roles.name
        FROM admins
        INNER JOIN roles ON admins.id_role = roles.id_role
        WHERE admins.id_admin =${db.escape(adminId)}
    `;
    const result = await query(getAdminRoleQuery);

    const adminRole = result[0].name.toLowerCase();
    if (adminRole === "super admin") {
      next();
    } else {
      res.status(401).send({
        error: "Unauthorized",
      });
    }
  } catch (error) {
    console.error("Error during admin role check: ", error);
    res.status(500).send({
      error: "An error occurred during admin role check",
    });
  }
};
const admins = async (req, res, next) => {
  try {
    console.log("from check role", req.headers)
    const adminId = getIdFromToken(req, res);
    const getAdminRoleQuery = `
    SELECT roles.name
    FROM admins
    INNER JOIN roles ON admins.id_role = roles.id_role
    WHERE admins.id_admin = ${db.escape(adminId)}
  `;
    const result = await query(getAdminRoleQuery);

    const adminRole = result[0].name.toLowerCase();

    if (adminRole === "super admin" || adminRole === "warehouse admin") {
      req.adminRole = adminRole; // Store the admin role in the request object
      next();
    } else {
      res.status(401).send({
        error: "Unauthorized",
      });
    }
  } catch (error) {
    console.error("Error during admin role check: ", error);
    res.status(401).send({
      error: "An error occurred during admin role check",
    });
  }
};

module.exports = { superAdmin, admins };
