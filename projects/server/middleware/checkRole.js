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
    console.log(adminId, "id admin");
    const result = await query(getAdminRoleQuery);
    console.log(result, "result");

    const adminRole = result[0].name.toLowerCase();
    console.log(adminRole, "test");
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
    const adminId = getIdFromToken(req, res);
    console.log(adminId, "adminId");
    const getAdminRoleQuery = `
    SELECT roles.name
    FROM admins
    INNER JOIN roles ON admins.id_role = roles.id_role
    WHERE admins.id_admin = ${db.escape(adminId)}
  `;
    console.log(adminId, "id admin");
    const result = await query(getAdminRoleQuery);
    console.log(result, "result");

    const adminRole = result[0].name.toLowerCase();
    console.log(adminRole, "test");

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
