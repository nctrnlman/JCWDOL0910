require("dotenv").config({
  path: ".env.local",
});
const { db, query } = require("../database");
const { getIdFromToken } = require("../helper/jwt-payload");

module.exports = {
  getUserProfile: async (req, res) => {
    try {
      const idUser = req.user.id;
      console.log(idUser, "userid");
      const getUserProfile = await query(
        `SELECT * FROM users WHERE id_user = ${db.escape(idUser)}`
      );
      return res.status(200).send(getUserProfile);
    } catch (error) {
      return res.status(error.status || 500).send(error);
    }
  },

  editUserProfile: async (req, res) => {
    try {
      const idUser = req.user.id;
      let dataUpdate = [];
      for (let prop in req.body) {
        // email sepertinya gabisa diganti ya? -- sementara yang bisa diganti : first&last name, gender
        if (prop !== "email") {
          dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
        }
      }

      const editUserQuery = `UPDATE users SET ${dataUpdate} WHERE id_user=${idUser}`;
      console.log(editUserQuery);

      const editUser = await query(editUserQuery);

      const getUserQuery = `SELECT * FROM users WHERE id_user = ${db.escape(
        idUser
      )}`;
      const getUser = await query(getUserQuery);

      return res.status(200).send(getUser);
    } catch (error) {
      return res.status(error.status || 500).send(error);
    }
  },

  uploadProfilePicture: async (req, res) => {
    try {
      const { file } = req;
      const idUser = req.user.id;
      const filepath = file ? "/" + file.filename : null;
      let response = await query(
        `UPDATE users SET image_path=${db.escape(
          filepath
        )} WHERE id_user=${db.escape(idUser)}`
      );
      res.status(200).send({ filepath });
    } catch (error) {
      return res.status(error.status || 500).send(error);
    }
  },

  addAddress: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { address, city, province, postal_code, is_primary } = req.body;
      let addAddressQuery = `INSERT INTO addresses VALUES (null, 
        ${db.escape(idUser)}, 
        ${db.escape(address)}, 
        ${db.escape(city)}, 
        ${db.escape(province)}, 
        ${db.escape(postal_code)},
        ${db.escape(is_primary)}
      )`;
      console.log(addAddressQuery);
      let addAddressResult = await query(addAddressQuery);
      res
        .status(200)
        .send({ data: addAddressResult, message: "Add Address Success" });
    } catch (error) {
      return res.status(error.status || 500).send(error);
    }
  },

  editAddress: async (req, res) => {
    try {
      console.log(req.params);
      const idUser = req.user.id;
      const id_address = req.params.id;
      let addressDataUpdate = [];
      for (let prop in req.body) {
        addressDataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
      }

      const editAddressQuery = `UPDATE addresses SET ${addressDataUpdate} WHERE id_address=${id_address}`;
      console.log(editAddressQuery);

      const editAddress = await query(editAddressQuery);

      const getAddressQuery = `SELECT * FROM addresses WHERE id_address = ${db.escape(
        id_address
      )}`;
      const getAddress = await query(getAddressQuery);

      return res.status(200).send(getAddress);
    } catch (error) {
      return res.status(error.status || 500).send(error);
    }
  },

  deleteAddress: async (req, res) => {
    try {
      id_address = req.params.id;
      let deleteAddressQuery = `DELETE FROM addresses WHERE id_address=${db.escape(
        id_address
      )};`;
      console.log(deleteAddressQuery);
      const execute_delete = await query(deleteAddressQuery);
      return res.status(200).send("Delete Address Succeed");
    } catch (error) {
      return res.status(error.status || 500).send(error);
    }
  },

  getUserAddress: async (req, res) => {
    try {
      const idUser = getIdFromToken(req, res);
      console.log(idUser, "getaddress");
      const getUserAddresses = await query(
        `SELECT * FROM addresses WHERE id_user = ${db.escape(idUser)}`
      );
      return res.status(200).send(getUserAddresses);
    } catch (error) {
      return res.status(error.status || 500).send(error);
    }
  },
};
