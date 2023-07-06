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
    console.log("dari loginAdmin", req.body)
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
      console.log("dari admin controller", admin)
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
        data: admin,
      });
    } catch (error) {
      console.error("Error during admin login: ", error);
      res.status(500).send({
        error: "An error occurred during admin login",
      });
    }
  },

  getAllUserForAdmin: async (req, res) => {
    try {
      // console.log(req.user)
      // const idUser = req.user.id;
      // console.log(idUser);
      const getAllUser = await query(
        `SELECT * FROM users`
      );
      console.log(getAllUser);
      return res.status(200).send(getAllUser);
    } catch (error) {
      return res.status(error.status || 500).send(error);
    }
  },

  getAllAdmins: async (req, res) => {
    try {
      // console.log(req.user)
      // const idUser = req.user.id;
      // console.log(idUser);
      const getAllAdmins = await query(
        `select admins.id_admin, admins.email, admins.name, admins.id_role, warehouses.name warehouse_name
        from admins 
        left join warehouses on admins.id_admin = warehouses.id_admin`
      );
      console.log(getAllAdmins);
      return res.status(200).send(getAllAdmins);
    } catch (error) {
      return res.status(error.status || 500).send(error);
    }
  },

  editWarehouseAdmin: async (req, res) => {
    try {
      console.log(req.params)
      // const idUser = req.user.id;
      // console.log(idUser)
      const id_admin = req.params.id;
      console.log(id_admin)
      console.log("req", req.body)

      let adminDataUpdate = [];
      for (let prop in req.body) {
        adminDataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
      }
      console.log(adminDataUpdate)
      const editAdminQuery = `UPDATE admins SET ${adminDataUpdate} WHERE id_admin=${id_admin}`;
      console.log(editAdminQuery)

      const editAdmin = await query(editAdminQuery);

      const getAdminQuery = `SELECT * FROM admins WHERE id_admin = ${db.escape(id_admin)}`;
      const getAdmin = await query(getAdminQuery);

      return res.status(200).send({ message: `Warehouse admin ID ${id_admin} edited successfully` });

    } catch (error) {
      return res.status(error.status || 500).send(error);
    }
  },

  assignWarehouseAdmin: async (req, res) => {
    try {
      console.log(req.params)
      // const idUser = req.user.id;
      // console.log(idUser)
      const id_admin = req.params.id;
      console.log(id_admin)
      console.log("req", req.body)

      // let adminAssignUpdate= [];
      // for (let prop in req.body) {
      //   adminAssignUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
      // }
      const { warehouse_name } = req.body;
      const assignAdminQuery = `UPDATE warehouses SET id_admin = ${id_admin} WHERE name='${warehouse_name}'`;
      console.log(assignAdminQuery)

      const assignAdmin = await query(assignAdminQuery);

      const getAdminAssignQuery = `SELECT * FROM warehouses WHERE name = '${warehouse_name}'`;
      const getAdminAssign = await query(getAdminAssignQuery);

      return res.status(200).send({ message: `Warehouse admin assigned to ${warehouse_name}` });

    } catch (error) {
      return res.status(error.status || 500).send(error);
    }
  },

  deleteWarehouseAdmin: async (req, res) => {
    try {
      console.log(req.params)
      // const idUser = req.user.id;
      // console.log(idUser)
      const id_admin = req.params.id;
      console.log(id_admin)
      console.log("req", req.body)

      const deleteAdminQuery = `DELETE FROM admins WHERE id_admin=${db.escape(id_admin)}`;
      console.log(deleteAdminQuery)

      const deleteAdmin = await query(deleteAdminQuery);

      const getAdminQuery = `SELECT * FROM admins`;
      const getAdmin = await query(getAdminQuery);

      return res.status(200).send({ message: `Admin ID ${id_admin} is now deleted` });

    } catch (error) {
      return res.status(error.status || 500).send(error);
    }
  },

};
