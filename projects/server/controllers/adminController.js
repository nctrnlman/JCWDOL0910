require("dotenv").config({
    path: ".env.local",
});
const { db, query } = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const env = process.env;

module.exports = {
    getAllUser: async (req, res) => {
        // console.log(req)
        try {
            const idUser = req.user.id;
            const idRole = req.user.id_role;

            if (idRole == 1) {
                const getAllUser = await query(
                    `SELECT * FROM users`
                );
                // console.log(getUserProfile);
                return res.status(200).send(getAllUser);
            }
            else {
                return res.status(200).send("Limited Access to SuperAdmin");
            }

        } catch (error) {
            return res.status(error.status || 500).send(error);
        }
    },

    assignWarehouseAdmin: async (req, res) => {
        // console.log(req)
        try {
            // console.log(req.user.id)
            // console.log(req.user.id_role)
            // console.log(req.params.id)
            const idUser = req.user.id;
            const idRole = req.user.id_role;
            const id_EditedUser = req.params.id;

            if (idRole == 1) {
                let adminDataUpdate = [];
                for (let prop in req.body) {
                    adminDataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
                }

                const editUserToBeAdminQuery = `UPDATE users SET ${adminDataUpdate} WHERE id_user=${id_EditedUser}`;
                console.log(editUserToBeAdminQuery)
                const editUserToBeAdmin = await query(editUserToBeAdminQuery);

                const getUserToBeAdminQuery = `SELECT * from users WHERE id_user=${id_EditedUser}`
                console.log(getUserToBeAdminQuery)
                const getUserToBeAdmin = await query(getUserToBeAdminQuery);

                const [{ email, first_name, id_role, password }] = getUserToBeAdmin;
                console.log(password)
                const addAdminQuery = `INSERT INTO admins VALUES (null, 
                    ${db.escape(email)}, 
                    ${db.escape(first_name)}, 
                    ${db.escape(id_role)}, 
                    ${db.escape(password)}, 
                    null
                )`;
                const addAdmin = await query(addAdminQuery);
                console.log(addAdminQuery)

                return res.status(200).send(addAdmin);
            }
            else {
                return res.status(200).send("Limited Access to SuperAdmin");
            }

        } catch (error) {
            return res.status(error.status || 500).send(error);
        }
    },

    getAllWarehouseAdmin: async (req, res) => {
        // console.log(req)
        try {
            const idUser = req.user.id;
            const idRole = req.user.id_role;

            if (idRole == 1) {
                const getAllUser = await query(
                    `SELECT * FROM admins`
                );
                // console.log(getUserProfile);
                return res.status(200).send(getAllUser);
            }
            else {
                return res.status(200).send("Limited Access to SuperAdmin");
            }

        } catch (error) {
            return res.status(error.status || 500).send(error);
        }
    },

    assignWarehouseAdminToWH: async (req, res) => {
        // console.log(req)
        try {
            // console.log(req.user.id)
            // console.log(req.user.id_role)
            // console.log(req.params.id)
            const idUser = req.user.id;
            const idRole = req.user.id_role;
            const id_EditedAdmin = req.params.id;

            if (idRole == 1) {
                let adminDataUpdate = [];
                for (let prop in req.body) {
                    adminDataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
                }

                const editAdminQuery = `UPDATE admins SET ${adminDataUpdate} WHERE id_admin=${id_EditedAdmin}`;
                console.log(editAdminQuery)
                const editAdmin = await query(editAdminQuery);

                const getWHAdminQuery = `SELECT * from admins WHERE id_admin=${id_EditedAdmin}`
                console.log(getWHAdminQuery)
                const getWHAdmin = await query(getWHAdminQuery);

                return res.status(200).send(getWHAdmin);
            }
            else {
                return res.status(200).send("Limited Access to SuperAdmin");
            }

        } catch (error) {
            return res.status(error.status || 500).send(error);
        }
    },
}