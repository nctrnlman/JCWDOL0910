const { db, query } = require("../database");
module.exports = {
  checkWarehouse: async (id_warehouse) => {
    const checkWarehouseQuery = `
      SELECT * FROM warehouses WHERE id_warehouse = ${db.escape(id_warehouse)}
    `;

    const existingWarehouse = await query(checkWarehouseQuery);
    return existingWarehouse;
  },

  fetchWarehouseQuery: (search, itemsPerPage, offset, sortBy = "ASC") => {
    let fetchWarehouseListQuery = `SELECT * FROM warehouses`;

    if (search) {
      search = db.escape(`%${search}%`);
      fetchWarehouseListQuery += ` WHERE name LIKE ${search}`;
    }
    fetchWarehouseListQuery += ` ORDER BY name ${
      sortBy === "DESC" ? "DESC" : "ASC"
    } `;

    fetchWarehouseListQuery += ` LIMIT ${itemsPerPage} OFFSET ${offset}`;

    return fetchWarehouseListQuery;
  },

  fetchWarehouseDataQuery: () => {
    return `SELECT * FROM warehouses ORDER BY name ASC;`;
  },

  countWarehouseQuery: (search) => {
    let countQuery = `SELECT COUNT(*) AS total FROM warehouses`;

    if (search) {
      search = db.escape(`%${search}%`);
      countQuery += ` WHERE name LIKE ${search}`;
    }

    return countQuery;
  },

  checkWarehouseName: async (name) => {
    const checkWarehouseNameQuery = `
      SELECT * FROM warehouses WHERE name = ${db.escape(name)}
    `;
    const existingWarehouse = await query(checkWarehouseNameQuery);
    return existingWarehouse.length > 0;
  },

  createWarehouse: async (
    name,
    address,
    district,
    city,
    province,
    postal_code,
    latitude,
    longitude
  ) => {
    const createWarehouseQuery = `
      INSERT INTO warehouses (name,address, district,city, province, postal_code, latitude, longitude, id_admin)
      VALUES (${db.escape(name)},${db.escape(address)}, ${db.escape(
      district
    )}, ${db.escape(city)}, ${db.escape(province)}, ${db.escape(
      postal_code
    )}, ${db.escape(latitude)}, ${db.escape(longitude)}, null)
    `;
    const newWarehouse = await query(createWarehouseQuery);
    return newWarehouse;
  },

  checkCity: async (city) => {
    const checkCityQuery = `
      SELECT * FROM warehouses WHERE city = ${db.escape(city)}
    `;
    const existingCity = await query(checkCityQuery);
    return existingCity;
  },

  editWarehouse: async (
    name,
    address,
    district,
    city,
    province,
    postal_code,
    latitude,
    longitude,
    id_warehouse
  ) => {
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
    return await query(editWarehouseQuery);
  },

  deleteWarehouse: async (id_warehouse) => {
    const deleteWarehouseQuery = `
      DELETE FROM warehouses WHERE id_warehouse = ${db.escape(id_warehouse)}
    `;
    return await query(deleteWarehouseQuery);
  },
};
