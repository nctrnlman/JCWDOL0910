const { db, query } = require("../database");
const {
  getCoordinates,
  checkProvinceAndCity,
} = require("../helper/setAddressHelper");
require("dotenv").config({
  path: ".env.local",
});

module.exports = {
  createWarehouse: async (req, res) => {
    const { name, address, district, city, province, postal_code } = req.body;
    try {
      await checkProvinceAndCity(province, city);
      const checkCityQuery = `
      SELECT * FROM warehouses WHERE city = ${db.escape(city)}
    `;
      const existingCity = await query(checkCityQuery);

      if (existingCity.length > 0) {
        res.status(400).send({
          error: "A warehouse with the same city already exists",
        });
        return;
      }

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

      const createWarehouseQuery = `
      INSERT INTO warehouses (name,address, district,city, province, postal_code, latitude, longitude, id_admin)
      VALUES (${db.escape(name)},${db.escape(address)}, ${db.escape(
        district
      )}, ${db.escape(city)}, ${db.escape(province)}, ${db.escape(
        postal_code
      )}, ${db.escape(latitude)}, ${db.escape(longitude)}, null)
    `;
      await query(createWarehouseQuery);

      res.status(201).send({
        message: "Warehouse created successfully",
      });
    } catch (error) {
      console.error("Error creating warehouse: ", error);
      res.status(500).send({
        error: "An error occurred while creating the warehouse",
      });
    }
  },
  editWarehouse: async (req, res) => {
    const { id_warehouse } = req.params;
    const { name, address, district, city, province, postal_code } = req.body;
    try {
      const checkWarehouseQuery = `
      SELECT * FROM warehouses WHERE id_warehouse = ${db.escape(id_warehouse)}
    `;
      const existingWarehouse = await query(checkWarehouseQuery);

      if (existingWarehouse.length === 0) {
        res.status(404).send({
          error: "Warehouse not found",
        });
        return;
      }

      const checkCityQuery = `
      SELECT * FROM warehouses WHERE city = ${db.escape(
        city
      )} AND id_warehouse != ${db.escape(id_warehouse)}
    `;
      const existingCity = await query(checkCityQuery);

      if (existingCity.length > 0) {
        res.status(400).send({
          error: "A warehouse with the same city already exists",
        });
        return;
      }

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

      const editWarehouseQuery = `
      UPDATE warehouses
      SET name = ${db.escape(name)}, address = ${db.escape(address)},
      district = ${db.escape(district)}, city = ${db.escape(city)},
      province = ${db.escape(province)}, postal_code = ${db.escape(
        postal_code
      )},
      latitude = ${db.escape(latitude)}, longitude = ${db.escape(longitude)}
      WHERE id_warehouse = ${db.escape(id_warehouse)}
    `;
      await query(editWarehouseQuery);

      res.status(200).send({
        message: "Warehouse updated successfully",
      });
    } catch (error) {
      console.error("Error editing warehouse: ", error);
      res.status(500).send({
        error: "An error occurred while editing the warehouse",
      });
    }
  },

  deleteWarehouse: async (req, res) => {
    const { id_warehouse } = req.params;
    try {
      const checkWarehouseQuery = `
      SELECT * FROM warehouses WHERE id_warehouse = ${db.escape(id_warehouse)}
    `;
      const existingWarehouse = await query(checkWarehouseQuery);

      if (existingWarehouse.length === 0) {
        res.status(404).send({
          error: "Warehouse not found",
        });
        return;
      }
      const deleteWarehouseQuery = `
      DELETE FROM warehouses WHERE id_warehouse = ${db.escape(id_warehouse)}
    `;
      await query(deleteWarehouseQuery);

      res.status(200).send({
        message: "Warehouse deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting warehouse: ", error);
      res.status(500).send({
        error: "An error occurred while deleting the warehouse",
      });
    }
  },
  fetchWarehouseList: async (req, res) => {
    try {
      const fetchWarehouseListQuery = `
        SELECT * FROM warehouses
      `;
      const warehouseList = await query(fetchWarehouseListQuery);

      res.status(200).send(warehouseList);
    } catch (error) {
      console.error("Error fetching warehouse list: ", error);
      res.status(500).send({
        error: "An error occurred while fetching the warehouse list",
      });
    }
  },
};
