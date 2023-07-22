const { query } = require("../database");
const { getPaginationParams } = require("../helper/getPaginationHelper");
const {
  getCoordinates,
  checkProvinceAndCity,
} = require("../helper/setAddressHelper");
const warehouseQueries = require("../queries/warehouseQueries");

module.exports = {
  createWarehouse: async (req, res) => {
    const { name, address, district, city, province, postal_code } = req.body;
    try {
      await checkProvinceAndCity(province, city);
      const existingCity = warehouseQueries.checkCity(city);

      if (existingCity.length > 0) {
        res.status(400).send({
          message: "A warehouse with the same city already exists",
        });
        return;
      }

      const isWarehouseNameExisting = await warehouseQueries.checkWarehouseName(
        name
      );
      if (isWarehouseNameExisting) {
        res.status(400).send({
          message: "A warehouse with the same name already exists",
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
        res.status(400).send({ message: "Coordinates not found" });
      }
      const { latitude, longitude } = result;

      const newWarehouse = await warehouseQueries.createWarehouse(
        name,
        address,
        district,
        city,
        province,
        postal_code,
        latitude,
        longitude
      );
      res.status(200).send({
        data: newWarehouse,
        message: "Warehouse created successfully",
      });
    } catch (error) {
      res.status(500).send({
        message: "An error occurred while creating the warehouse",
        error,
      });
    }
  },

  editWarehouse: async (req, res) => {
    const { id_warehouse } = req.params;
    const { name, address, district, city, province, postal_code } = req.body;
    try {
      const existingWarehouse = await warehouseQueries.checkWarehouse(
        id_warehouse
      );
      if (existingWarehouse.length === 0) {
        res.status(400).send({
          message: "Warehouse not found",
        });
        return;
      }

      const existingCity = warehouseQueries.checkCity(city);
      if (existingCity.length > 0) {
        res.status(400).send({
          message: "A warehouse with the same city already exists",
        });
        return;
      }

      const result = await getCoordinates(existingWarehouse);
      if (!result) {
        res.status(400).send({ message: "Coordinates not found" });
      }
      const { latitude, longitude } = result;

      await warehouseQueries.editWarehouse(
        name,
        address,
        district,
        city,
        province,
        postal_code,
        latitude,
        longitude,
        id_warehouse
      );

      res.status(200).send({
        message: "Warehouse updated successfully",
      });
    } catch (error) {
      console.error("Error editing warehouse: ", error);
      res.status(500).send({
        message: "An error occurred while editing the warehouse",
        error,
      });
    }
  },

  deleteWarehouse: async (req, res) => {
    const { id_warehouse } = req.params;
    try {
      const existingWarehouse = await warehouseQueries.checkWarehouse(
        id_warehouse
      );

      if (existingWarehouse.length === 0) {
        res.status(400).send({
          message: "Warehouse not found",
        });
        return;
      }

      await warehouseQueries.deleteWarehouse(id_warehouse);
      res.status(200).send({
        message: "Warehouse deleted successfully",
      });
    } catch (error) {
      res.status(500).send({
        message: "An error occurred while deleting the warehouse",
        error,
      });
    }
  },

  fetchWarehouseList: async (req, res) => {
    try {
      let { search, sort } = req.query;
      const itemsPerPage = 3;
      const { offset } = getPaginationParams(req, itemsPerPage);
      let sortOption = "ASC";
      if (sort === "desc") {
        sortOption = "DESC";
      }

      const fetchWarehouseListQuery = warehouseQueries.fetchWarehouseQuery(
        search,
        itemsPerPage,
        offset,
        sortOption
      );
      const countQuery = warehouseQueries.countWarehouseQuery(search);
      const [warehouseList, totalCountResult] = await Promise.all([
        query(fetchWarehouseListQuery),
        query(countQuery),
      ]);

      const totalCount = totalCountResult[0].total;
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      res.status(200).send({
        warehouses: warehouseList,
        totalPages: totalPages,
        itemsPerPage: itemsPerPage,
      });
    } catch (error) {
      res.status(500).send({
        message: "An error occurred while fetching the warehouse list",
        error,
      });
    }
  },
  fetchWarehouseData: async (req, res) => {
    try {
      const warehouseData = await query(
        warehouseQueries.fetchWarehouseDataQuery()
      );
      res.status(200).send({
        data: warehouseData,
      });
    } catch (error) {
      res.status(500).send({
        message: "An error occurred while fetching the warehouse data",
        error,
      });
    }
  },
};
