require("dotenv").config({
  path: ".env.local",
});
const { db, query } = require("../database");
const { getIdFromToken } = require("../helper/jwt-payload");
const {
  getCoordinates,
  // checkProvinceAndCity,
} = require("../helper/setAddressHelper");

module.exports = {
  getUserProfile: async (req, res) => {
    // console.log(req)
    try {
      const idUser = req.user.id;
      const getUserProfile = await query(
        `SELECT * FROM users WHERE id_user = ${db.escape(idUser)}`
      );
      // console.log(getUserProfile);
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
      console.log("iduser", idUser)
      let { address, district, city, province, postal_code } = req.body;
      // console.log("reqbody", req.body)
      // console.log("dari controller address 1", address.split(" | ")[1], address.split(" | ")[0])
      // let district = address.split(" | ")[1];
      // address = address.split(" | ")[0];
      // console.log("dari controller address 2", district, address)
      const result = await getCoordinates(
        address,
        district,
        city,
        province,
        postal_code
      );
      if (!result) {
        throw new Error("Coordinates not found");
      }
      const { latitude, longitude } = result;
      console.log(latitude, longitude);

      const addAddressQuery = `
      INSERT INTO addresses (id_user,address, city, province, postal_code, is_primary, district, latitude, longitude)
      VALUES (${db.escape(idUser)},${db.escape(address)}, ${db.escape(city)}, ${db.escape(province)}, 
      ${db.escape(postal_code)}, null, ${db.escape(district)}, ${db.escape(latitude)}, ${db.escape(longitude)})`;
      let addAddressResult = await query(addAddressQuery);

      res.status(201).send({
        data: addAddressResult, message: "Add Address Success"
      });


      // let addAddressQuery = `INSERT INTO addresses VALUES (null, 
      //   ${db.escape(idUser)}, 
      //   ${db.escape(address)}, 
      //   ${db.escape(city)}, 
      //   ${db.escape(province)}, 
      //   ${db.escape(postal_code)},
      // )`;
      // console.log(addAddressQuery);
      // let addAddressResult = await query(addAddressQuery);
      // res
      //   .status(200)
      //   .send({ data: addAddressResult, message: "Add Address Success" });
    } catch (error) {
      return res.status(error.status || 500).send(error);
    }
  },

  editAddress: async (req, res) => {
    try {
      console.log(req.params);
      const idUser = req.user.id;
      const id_address = req.params.id;
      // let addressDataUpdate = [];
      // for (let prop in req.body) {
      //   addressDataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
      // }
      const { address, district, city, province, postal_code } = req.body;

      const result = await getCoordinates(
        address,
        district,
        city,
        province,
        postal_code
      );

      if (!result) {
        throw new Error("Coordinates not found");
      }

      const { latitude, longitude } = result;
      const editAddressQuery = `UPDATE addresses
      SET address = ${db.escape(address)},
      district = ${db.escape(district)}, city = ${db.escape(city)},
      province = ${db.escape(province)}, postal_code = ${db.escape(
        postal_code
      )},
      latitude = ${db.escape(latitude)}, longitude = ${db.escape(longitude)}
      WHERE id_address = ${db.escape(id_address)}`;
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
      console.log(error);
      return res.status(error.status || 500).send("babi");
    }
  },

  getUserAddress: async (req, res) => {
    try {
      const idUser = getIdFromToken(req, res);
      console.log(idUser, "getaddress");
      const getUserAddresses = await query(
        `SELECT * , 
        case when is_primary = 1 then "Primary"
        else "Non-Primary" end as is_primary2
        FROM addresses WHERE id_user = ${db.escape(idUser)} order by is_primary desc`
      );
      return res.status(200).send(getUserAddresses);
    } catch (error) {
      return res.status(error.status || 500).send(error);
    }
  },

  setPrimaryAddress: async (req, res) => {
    try {
      console.log(req.params);
      const idUser = req.user.id;
      const id_address = req.params.id;

      const hapusPrevPrimaryQuery = `UPDATE addresses SET is_primary = NULL WHERE id_user = ${idUser}`;
      const hapusPrevPrimary = await query(hapusPrevPrimaryQuery);

      const setPrimaryQuery = `UPDATE addresses SET is_primary = 1 WHERE id_address=${id_address}`;
      console.log(setPrimaryQuery);

      const setPrimary = await query(setPrimaryQuery);

      const getAddressQuery = `SELECT * FROM addresses WHERE id_address = ${db.escape(id_address)} order by is_primary desc`;
      const getAddress = await query(getAddressQuery);

      return res.status(200).send(getAddress);
    } catch (error) {
      return res.status(error.status || 500).send(error);
    }
  },


};
