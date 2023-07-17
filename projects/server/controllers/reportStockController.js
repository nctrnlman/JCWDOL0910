const { db, query } = require(`../database/index`);
// const format = require(`date-fns/format`);
// const add = require(`date-fns/add`);
const { getIdFromToken, getRoleFromToken } = require("../helper/jwt-payload");

module.exports = {
  fetchStockMovementHistory: async (req, res) => {
    try {
      const role = getRoleFromToken(req, res); // Get the role from the token
      // let warehouseId = null;
      if (role === "warehouse admin") {
        const adminId = getIdFromToken(req, res); // Get the admin ID from the token
        let getwarehouseId = await query(
          `select id_warehouse from warehouses where id_admin = ${adminId}`
        );
        let warehouseId = getwarehouseId[0].id_warehouse;
        let stockQueryByWhadmin = `select w.id_warehouse, w.name warehouse_name, p.name product_name, sh.status, sh.stock_change, sh.created_at
            from stock_history sh 
            left join stocks s on sh.id_stock = s.id_stock
            left join products p on s.id_product = p.id_product
            left join warehouses w on s.id_warehouse = w.id_warehouse
            where w.id_warehouse = ${warehouseId}
            order by 1 asc, 2 asc, created_at asc`;
        let result = await query(stockQueryByWhadmin);
        return res
          .status(200)
          .send({
            success: true,
            message: "Fetch transactions data by category",
            result,
          });
      }

      if (role === "super admin") {
        let stockQuery = `select w.id_warehouse, w.name warehouse_name, p.name product_name, sh.status, sh.stock_change, sh.created_at
            from stock_history sh 
            left join stocks s on sh.id_stock = s.id_stock
            left join products p on s.id_product = p.id_product
            left join warehouses w on s.id_warehouse = w.id_warehouse
            order by 1 asc, 2 asc, created_at asc`;

        let result = await query(stockQuery);
        res
          .status(200)
          .send({
            success: true,
            message: "Fetching stock history works!",
            result,
          });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  fetchRingkasanStockBulanan: async (req, res) => {
    try {
      const role = getRoleFromToken(req, res); // Get the role from the token
      if (role === "warehouse admin") {
        const adminId = getIdFromToken(req, res); // Get the admin ID from the token
        let getwarehouseId = await query(
          `select id_warehouse from warehouses where id_admin = ${adminId}`
        );
        let warehouseId = getwarehouseId[0].id_warehouse;
        let RingkasanStockBulananByWHAdmin = `with stockz as (select w.id_warehouse, w.name warehouse_name, p.name product_name, sh.status, sh.stock_change, sh.created_at
                    from stock_history sh 
                    left join stocks s on sh.id_stock = s.id_stock
                    left join products p on s.id_product = p.id_product
                    left join warehouses w on s.id_warehouse = w.id_warehouse
                    order by 1 asc, 2 asc, created_at asc),
                    
                    all_movement as (
                    select distinct concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, DATE_FORMAT(created_at, "%c") numeric_months,
                    id_warehouse, warehouse_name, product_name
                    from stockz),
                    
                    penambahan as (select distinct concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, 
                    id_warehouse, warehouse_name, product_name, sum(stock_change) total_penambahan
                    from stockz 
                    where status like "%incoming%" group by 1,2,3,4),
                    
                    pengurangan as (select distinct concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, 
                    id_warehouse, warehouse_name, product_name, sum(stock_change) total_pengurangan
                    from stockz 
                    where status like "%outgoing%" group by 1,2,3,4),
                                        
                    final1 as (select distinct a.*, ifnull(total_penambahan,0) total_penambahan , ifnull(total_pengurangan,0) total_pengurangan, ifnull(total_penambahan,0) - ifnull(total_pengurangan,0) stock_akhir_bulan , numeric_months-1 prev_month
                    from all_movement a 
                    left join penambahan t on a.months = t.months and a.id_warehouse = t.id_warehouse and a.product_name = t.product_name
                    left join pengurangan k on a.months = k.months and a.id_warehouse = k.id_warehouse and a.product_name = k.product_name
                    order by months asc, id_warehouse asc, product_name asc)
                                        
                    select * , ifnull(stock_awal_bulan,0) + ifnull(total_penambahan,0) - ifnull(total_pengurangan,0) stock_akhir_bulan
                    from (select f1.months , f1.id_warehouse, f1.warehouse_name, f1.product_name,
                    ifnull(f2.stock_akhir_bulan,0) stock_awal_bulan, f1.total_penambahan, f1.total_pengurangan
                    from final1 f1 
                    left join final1 f2 on f1.prev_month = f2.months and f1.id_warehouse = f2.id_warehouse and f1.product_name = f2.product_name
                    ) n
                    where id_warehouse = ${warehouseId}
                    order by months asc, id_warehouse asc, product_name asc`;

        let result = await query(RingkasanStockBulananByWHAdmin);
        res
          .status(200)
          .send({
            success: true,
            message: "Fetching stock history recap works!",
            result,
          });
      }

      if (role === "super admin") {
        let RingkasanStockBulananbysuper = `with stockz as (select w.id_warehouse, w.name warehouse_name, p.name product_name, sh.status, sh.stock_change, sh.created_at
                    from stock_history sh 
                    left join stocks s on sh.id_stock = s.id_stock
                    left join products p on s.id_product = p.id_product
                    left join warehouses w on s.id_warehouse = w.id_warehouse
                    order by 1 asc, 2 asc, created_at asc),
                    
                    all_movement as (
                    select distinct concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, DATE_FORMAT(created_at, "%c") numeric_months,
                    id_warehouse, warehouse_name, product_name
                    from stockz),
                    
                    penambahan as (select distinct concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, 
                    id_warehouse, warehouse_name, product_name, sum(stock_change) total_penambahan
                    from stockz 
                    where status like "%incoming%" group by 1,2,3,4),
                    
                    pengurangan as (select distinct concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, 
                    id_warehouse, warehouse_name, product_name, sum(stock_change) total_pengurangan
                    from stockz 
                    where status like "%outgoing%" group by 1,2,3,4),
                    
                    
                    final1 as (select distinct a.*, ifnull(total_penambahan,0) total_penambahan , ifnull(total_pengurangan,0) total_pengurangan, ifnull(total_penambahan,0) - ifnull(total_pengurangan,0) stock_akhir_bulan , numeric_months-1 prev_month
                    from all_movement a 
                    left join penambahan t on a.months = t.months and a.id_warehouse = t.id_warehouse and a.product_name = t.product_name
                    left join pengurangan k on a.months = k.months and a.id_warehouse = k.id_warehouse and a.product_name = k.product_name
                    order by months asc, id_warehouse asc, product_name asc)
                    
                    
                    select * , ifnull(stock_awal_bulan,0) + ifnull(total_penambahan,0) - ifnull(total_pengurangan,0) stock_akhir_bulan
                    from (select f1.months , f1.id_warehouse, f1.warehouse_name, f1.product_name,
                    ifnull(f2.stock_akhir_bulan,0) stock_awal_bulan, f1.total_penambahan, f1.total_pengurangan
                    from final1 f1 
                    left join final1 f2 on f1.prev_month = f2.months and f1.id_warehouse = f2.id_warehouse and f1.product_name = f2.product_name
                    ) n
                    order by months asc, id_warehouse asc, product_name asc`;

        let result = await query(RingkasanStockBulananbysuper);
        res
          .status(200)
          .send({
            success: true,
            message: "Fetching stock history recap works!",
            result,
          });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  fetchRingkasanStockBulananByWarehouse: async (req, res) => {
    try {
      const role = getRoleFromToken(req, res); // Get the role from the token
      const id_warehouse = req.params.id;

      if (role === "super admin") {
        let RingkasanStockBulananbysuper = `with stockz as (select w.id_warehouse, w.name warehouse_name, p.name product_name, sh.status, sh.stock_change, sh.created_at
                    from stock_history sh 
                    left join stocks s on sh.id_stock = s.id_stock
                    left join products p on s.id_product = p.id_product
                    left join warehouses w on s.id_warehouse = w.id_warehouse
                    order by 1 asc, 2 asc, created_at asc),
                    
                    all_movement as (
                    select distinct concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, DATE_FORMAT(created_at, "%c") numeric_months,
                    id_warehouse, warehouse_name, product_name
                    from stockz),
                    
                    penambahan as (select distinct concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, 
                    id_warehouse, warehouse_name, product_name, sum(stock_change) total_penambahan
                    from stockz 
                    where status like "%incoming%" group by 1,2,3,4),
                    
                    pengurangan as (select distinct concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, 
                    id_warehouse, warehouse_name, product_name, sum(stock_change) total_pengurangan
                    from stockz 
                    where status like "%outgoing%" group by 1,2,3,4),
                    
                    
                    final1 as (select distinct a.*, ifnull(total_penambahan,0) total_penambahan , ifnull(total_pengurangan,0) total_pengurangan, ifnull(total_penambahan,0) - ifnull(total_pengurangan,0) stock_akhir_bulan , numeric_months-1 prev_month
                    from all_movement a 
                    left join penambahan t on a.months = t.months and a.id_warehouse = t.id_warehouse and a.product_name = t.product_name
                    left join pengurangan k on a.months = k.months and a.id_warehouse = k.id_warehouse and a.product_name = k.product_name
                    order by months asc, id_warehouse asc, product_name asc)
                    
                    
                    select * , ifnull(stock_awal_bulan,0) + ifnull(total_penambahan,0) - ifnull(total_pengurangan,0) stock_akhir_bulan
                    from (select f1.months , f1.id_warehouse, f1.warehouse_name, f1.product_name,
                    ifnull(f2.stock_akhir_bulan,0) stock_awal_bulan, f1.total_penambahan, f1.total_pengurangan
                    from final1 f1 
                    left join final1 f2 on f1.prev_month = f2.months and f1.id_warehouse = f2.id_warehouse and f1.product_name = f2.product_name
                    ) n
                    where id_warehouse = ${id_warehouse}
                    order by months asc, id_warehouse asc, product_name asc`;

        let result = await query(RingkasanStockBulananbysuper);
        res
          .status(200)
          .send({
            success: true,
            message: "Fetching stock history recap works!",
            result,
          });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  fetchStockMovementHistoryByWarehouse: async (req, res) => {
    try {
      const role = getRoleFromToken(req, res); // Get the role from the token
      // let warehouseId = null;
      const id_warehouse = req.params.id;

      if (role === "super admin") {
        let stockQuery = `select w.id_warehouse, w.name warehouse_name, p.name product_name, sh.status, sh.stock_change, sh.created_at
            from stock_history sh 
            left join stocks s on sh.id_stock = s.id_stock
            left join products p on s.id_product = p.id_product
            left join warehouses w on s.id_warehouse = w.id_warehouse
            where w.id_warehouse = ${id_warehouse}
            order by 1 asc, 2 asc, created_at asc`;

        let result = await query(stockQuery);
        res
          .status(200)
          .send({
            success: true,
            message: "Fetching stock history works!",
            result,
          });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
