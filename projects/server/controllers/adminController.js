const { db, query } = require("../database");
require("dotenv").config({
  path: ".env.local",
});
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const env = process.env;

module.exports = {
  createAdmin: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      // Check if an admin with the Super Admin role already exists
      const checkExistingAdminQuery = `
      SELECT * FROM admins AS a
      JOIN roles AS r ON a.id_role = r.id_role
      WHERE r.name = 'super admin'
    `;
      const existingSuperAdmin = await query(checkExistingAdminQuery);

      if (existingSuperAdmin.length > 0) {
        res.status(400).send({
          error: "An admin with the Super Admin role already exists",
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const createAdminQuery = `
      INSERT INTO admins (name, email, password, id_role)
      VALUES (${db.escape(name)}, ${db.escape(email)}, ${db.escape(
        hashedPassword
      )}, (SELECT id_role FROM roles WHERE name = 'super admin'))
    `;
      await query(createAdminQuery);

      res.status(201).send({
        message: "Admin created successfully",
      });
    } catch (error) {
      console.error("Error creating admin: ", error);
      res.status(500).send({
        error: "An error occurred while creating the admin",
      });
    }
  },

  createWarehouseAdmin: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const checkWarehouseAdminQuery = `
      SELECT * FROM admins AS a
      JOIN roles AS r ON a.id_role = r.id_role
      WHERE a.email = ${db.escape(email)} AND r.name = 'warehouse admin'
    `;
      const existingWarehouseAdmin = await query(checkWarehouseAdminQuery);

      if (existingWarehouseAdmin.length > 0) {
        res.status(400).send({
          error: "Warehouse admin with the same email already exists",
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const createWarehouseAdminQuery = `
      INSERT INTO admins (name, email, password, id_role)
      VALUES (${db.escape(name)}, ${db.escape(email)}, ${db.escape(
        hashedPassword
      )}, (SELECT id_role FROM roles WHERE name = 'warehouse admin'))
    `;
      await query(createWarehouseAdminQuery);

      res.status(201).send({
        message: "Warehouse admin created successfully",
      });
    } catch (error) {
      console.error("Error creating warehouse admin: ", error);
      res.status(500).send({
        error: "An error occurred while creating the warehouse admin",
      });
    }
  },

  loginAdmin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const checkAdminQuery = `
        SELECT * FROM admins WHERE email = ${db.escape(email)}
      `;
      const existingAdmin = await query(checkAdminQuery);

      if (existingAdmin.length === 0) {
        res.status(404).send({
          error: "Admin not found",
        });
        return;
      }

      const admin = existingAdmin[0];
      const passwordMatch = await bcrypt.compare(password, admin.password);

      if (!passwordMatch) {
        res.status(401).send({
          error: "Invalid password",
        });
        return;
      }
      const token = jwt.sign(
        { id: admin.id_admin, email: admin.email, role: admin.id_role },
        env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).send({
        token,
        message: "Admins login successful",
      });
    } catch (error) {
      console.error("Error during admin login: ", error);
      res.status(500).send({
        error: "An error occurred during admin login",
      });
    }
  },
};
