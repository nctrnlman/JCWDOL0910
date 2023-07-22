const { db, query } = require(`../database/index`);
const format = require(`date-fns/format`);
const add = require(`date-fns/add`);
const { getIdFromToken, getRoleFromToken } = require("../helper/jwt-payload");

module.exports = {
  fetchAllMonthlyTransactions: async (req, res) => {
    try {
      const role = getRoleFromToken(req, res); // Get the role from the token
      // let warehouseId = null;
      if (role === "warehouse admin") {
        const adminId = getIdFromToken(req, res); // Get the admin ID from the token
        let getwarehouseId = await query(
          `select id_warehouse from warehouses where id_admin = ${adminId}`
        );
        let warehouseId = getwarehouseId[0].id_warehouse;
        let transactionQueryWHAdmin = `select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months,
                o.id_warehouse, w.name warehouse_name,
                sum(total_amount) total_amount, 
                count(distinct id_order) total_orders 
                from orders o
                left join warehouses w on o.id_warehouse = w.id_warehouse
                where o.id_warehouse = ${warehouseId} and lower(status) like "%pesanan dikonfirmasi%"
                group by 1,2,3 order by 1 asc`;
        let result = await query(transactionQueryWHAdmin);
        return res
          .status(200)
          .send({ success: true, message: "Fetch transactions data", result });
      }

      if (role === "super admin") {
        let transactionQuerySuperAdmin = `select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months,
                o.id_warehouse, w.name warehouse_name,
                sum(total_amount) total_amount, 
                count(distinct id_order) total_orders 
                from orders o
                left join warehouses w on o.id_warehouse = w.id_warehouse
                where lower(o.status) like "%pesanan dikonfirmasi%"
                group by 1,2,3 order by 1 asc`;
        let result = await query(transactionQuerySuperAdmin);
        return res
          .status(200)
          .send({ success: true, message: "Fetch transactions data", result });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  fetchAllMonthlyTransactions: async (req, res) => {
    try {
      const role = getRoleFromToken(req, res); // Get the role from the token
      // let warehouseId = null;
      if (role === "warehouse admin") {
        const adminId = getIdFromToken(req, res); // Get the admin ID from the token
        let getwarehouseId = await query(
          `select id_warehouse from warehouses where id_admin = ${adminId}`
        );
        let warehouseId = getwarehouseId[0].id_warehouse;
        let transactionQueryWHAdmin = `select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months,
                o.id_warehouse, w.name warehouse_name,
                sum(total_amount) total_amount, 
                count(distinct id_order) total_orders 
                from orders o
                left join warehouses w on o.id_warehouse = w.id_warehouse
                where o.id_warehouse = ${warehouseId} and lower(o.status) like "%pesanan dikonfirmasi%"
                group by 1,2,3 order by 1 asc`;
        let result = await query(transactionQueryWHAdmin);
        return res
          .status(200)
          .send({ success: true, message: "Fetch transactions data", result });
      }

      if (role === "super admin") {
        let transactionQuerySuperAdmin = `select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months,
                o.id_warehouse, w.name warehouse_name,
                sum(total_amount) total_amount, 
                count(distinct id_order) total_orders 
                from orders o
                left join warehouses w on o.id_warehouse = w.id_warehouse
                where lower(status) like "%pesanan dikonfirmasi%"
                group by 1,2,3 order by 1 asc`;
        let result = await query(transactionQuerySuperAdmin);
        return res
          .status(200)
          .send({ success: true, message: "Fetch transactions data", result });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  fetchAllMonthlyCategoryTransactions: async (req, res) => {
    try {
      const role = getRoleFromToken(req, res); // Get the role from the token
      // let warehouseId = null;
      if (role === "warehouse admin") {
        const adminId = getIdFromToken(req, res); // Get the admin ID from the token
        let getwarehouseId = await query(
          `select id_warehouse from warehouses where id_admin = ${adminId}`
        );
        let warehouseId = getwarehouseId[0].id_warehouse;
        let transactionQueryWHAdmin = `with orderss as (
                    select oi.id_item, oi.id_user, oi.id_order, oi.product_name, oi.product_price, oi.quantity, 
                    p.id_category, c.name product_category, o.created_at, o.status, o.id_warehouse, w.name warehouse_name, p.price*oi.quantity total_amount_product 
                    from order_items as oi 
                    left join orders as o on oi.id_order = o.id_order
                    left join products as p on oi.product_name = p.name
                    left join categories as c on p.id_category = c.id_category
					left join warehouses w on o.id_warehouse = w.id_warehouse
                    where lower(o.status) like "%pesanan dikonfirmasi%"
                    order by 1 asc)
                    select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, warehouse_name,
                    product_category, 
                    sum(total_amount_product) total_amount, count(distinct id_order) total_orders 
                    from orderss
                    where created_at is not null and id_warehouse = ${warehouseId} 
                group by 1,2,3
                    order by 1 asc, 2 asc, total_amount desc`;
        let result = await query(transactionQueryWHAdmin);
        return res
          .status(200)
          .send({
            success: true,
            message: "Fetch transactions data by category",
            result,
          });
      }

      if (role === "super admin") {
        let transactionQuerySuperAdmin = `with orderss as (
                    select oi.id_item, oi.id_user, oi.id_order, oi.product_name, oi.product_price, oi.quantity, 
                    p.id_category, c.name product_category, o.created_at, o.status, o.id_warehouse, w.name warehouse_name, p.price*oi.quantity total_amount_product 
                    from order_items as oi 
                    left join orders as o on oi.id_order = o.id_order
                    left join products as p on oi.product_name = p.name
                    left join categories as c on p.id_category = c.id_category
					left join warehouses w on o.id_warehouse = w.id_warehouse
                    where lower(o.status) like "%pesanan dikonfirmasi%"
                    order by 1 asc)
                    select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, warehouse_name,
                    product_category, 
                    sum(total_amount_product) total_amount, count(distinct id_order) total_orders 
                    from orderss
                    where created_at is not null
                    group by 1,2,3
                    order by 1 asc, 2 asc, total_amount desc`;
        let result = await query(transactionQuerySuperAdmin);
        return res
          .status(200)
          .send({
            success: true,
            message: "Fetch transactions data by category",
            result,
          });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  fetchAllMonthlyProductTransactions: async (req, res) => {
    try {
      const role = getRoleFromToken(req, res); // Get the role from the token
      // let warehouseId = null;
      if (role === "warehouse admin") {
        const adminId = getIdFromToken(req, res); // Get the admin ID from the token
        let getwarehouseId = await query(
          `select id_warehouse from warehouses where id_admin = ${adminId}`
        );
        let warehouseId = getwarehouseId[0].id_warehouse;
        let transactionQueryWHAdmin = `with orderss as (
                    select oi.id_item, oi.id_user, oi.id_order, oi.product_name, oi.product_price, oi.quantity, 
                    p.id_category, c.name product_category, o.created_at, o.status, o.id_warehouse, w.name warehouse_name, p.price*oi.quantity total_amount_product 
                    from order_items as oi 
                    left join orders as o on oi.id_order = o.id_order
                    left join products as p on oi.product_name = p.name
                    left join categories as c on p.id_category = c.id_category
					left join warehouses w on o.id_warehouse = w.id_warehouse
                    where lower(o.status) like "%pesanan dikonfirmasi%"
                    order by 1 asc)
                    select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, warehouse_name,
                    product_name, 
                    sum(total_amount_product) total_amount, count(distinct id_order) total_orders 
                    from orderss
                    where created_at is not null and id_warehouse = ${warehouseId} 
                group by 1,2,3
                    order by 1 asc, 2 asc, total_amount desc`;
        let result = await query(transactionQueryWHAdmin);
        return res
          .status(200)
          .send({
            success: true,
            message: "Fetch transactions data by category",
            result,
          });
      }

      if (role === "super admin") {
        let transactionQuerySuperAdmin = `with orderss as (
                    select oi.id_item, oi.id_user, oi.id_order, oi.product_name, oi.product_price, oi.quantity, 
                    p.id_category, c.name product_category, o.created_at, o.status, o.id_warehouse, w.name warehouse_name, p.price*oi.quantity total_amount_product 
                    from order_items as oi 
                    left join orders as o on oi.id_order = o.id_order
                    left join products as p on oi.product_name = p.name
                    left join categories as c on p.id_category = c.id_category
					left join warehouses w on o.id_warehouse = w.id_warehouse
                    where lower(o.status) like "%pesanan dikonfirmasi%"
                    order by 1 asc)
                    select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, warehouse_name,
                    product_name, 
                    sum(total_amount_product) total_amount, count(distinct id_order) total_orders 
                    from orderss
                    where created_at is not null
                    group by 1,2,3
                    order by 1 asc, 2 asc, total_amount desc`;
        let result = await query(transactionQuerySuperAdmin);
        return res
          .status(200)
          .send({
            success: true,
            message: "Fetch transactions data by category",
            result,
          });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  fetchAllMonthlyTransactionsByWarehouse: async (req, res) => {
    try {
      const role = getRoleFromToken(req, res); // Get the role from the token
      // let warehouseId = null;
      const id_warehouse = req.params.id;

      if (role === "super admin") {
        let transactionQuerySuperAdmin = `select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months,
                o.id_warehouse, w.name warehouse_name,
                sum(total_amount) total_amount, 
                count(distinct id_order) total_orders 
                from orders o
                left join warehouses w on o.id_warehouse = w.id_warehouse
                where o.id_warehouse = ${id_warehouse} and lower(status) like "%pesanan dikonfirmasi%"
                group by 1,2,3 order by 1 asc`;
        let result = await query(transactionQuerySuperAdmin);
        return res
          .status(200)
          .send({
            success: true,
            message: "Fetch transactions data by warehouse",
            result,
          });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  fetchAllMonthlyCategoryTransactionsByWarehouse: async (req, res) => {
    try {
      const role = getRoleFromToken(req, res); // Get the role from the token
      // let warehouseId = null;
      const id_warehouse = req.params.id;

      if (role === "super admin") {
        let transactionQuerySuperAdmin = `with orderss as (
                    select oi.id_item, oi.id_user, oi.id_order, oi.product_name, oi.product_price, oi.quantity, 
                    p.id_category, c.name product_category, o.created_at, o.status, o.id_warehouse, w.name warehouse_name, p.price*oi.quantity total_amount_product 
                    from order_items as oi 
                    left join orders as o on oi.id_order = o.id_order
                    left join products as p on oi.product_name = p.name
                    left join categories as c on p.id_category = c.id_category
					left join warehouses w on o.id_warehouse = w.id_warehouse
                    where lower(status) like "%pesanan dikonfirmasi%"
                    order by 1 asc)
                    select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, warehouse_name,
                    product_category, 
                    sum(total_amount_product) total_amount, count(distinct id_order) total_orders 
                    from orderss
                    where created_at is not null and id_warehouse = ${id_warehouse}
                    group by 1,2,3
                    order by 1 asc, 2 asc, total_amount desc`;
        let result = await query(transactionQuerySuperAdmin);
        return res
          .status(200)
          .send({
            success: true,
            message: "Fetch transactions data by category by warehouse",
            result,
          });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  fetchAllMonthlyProductTransactionsByWarehouse: async (req, res) => {
    try {
      const role = getRoleFromToken(req, res); // Get the role from the token
      // let warehouseId = null;
      const id_warehouse = req.params.id;

      if (role === "super admin") {
        let transactionQuerySuperAdmin = `with orderss as (
                    select oi.id_item, oi.id_user, oi.id_order, oi.product_name, oi.product_price, oi.quantity, 
                    p.id_category, c.name product_category, o.created_at, o.status, o.id_warehouse, w.name warehouse_name, p.price*oi.quantity total_amount_product 
                    from order_items as oi 
                    left join orders as o on oi.id_order = o.id_order
                    left join products as p on oi.product_name = p.name
                    left join categories as c on p.id_category = c.id_category
					left join warehouses w on o.id_warehouse = w.id_warehouse
                    where lower(status) like "%pesanan dikonfirmasi%"
                    order by 1 asc)
                    select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, warehouse_name,
                    product_name, 
                    sum(total_amount_product) total_amount, count(distinct id_order) total_orders 
                    from orderss
                    where created_at is not null and id_warehouse = ${id_warehouse}
                    group by 1,2,3
                    order by 1 asc, 2 asc, total_amount desc`;
        let result = await query(transactionQuerySuperAdmin);
        return res
          .status(200)
          .send({
            success: true,
            message: "Fetch transactions data by category by warehouse",
            result,
          });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  fetchTransactionOnDateRange: async (req, res) => {
    try {
      const { startDate, endDate } = req.body.dateRange;
      if (!startDate && !endDate) {
        const currentDate = format(Date.now(), "yyyy-MM-dd");
        const sevenDaysAgo = format(
          add(Date.now(), { days: -7 }),
          "yyyy-MM-dd"
        );
        let transactionQuery = `select date(created_at) as date, sum(total_amount) as total_amount, count(distinct id_order) as total_orders from orders where date(created_at) >= "${sevenDaysAgo}" and date(created_at) <= "${currentDate}" group by 1 order by 1 desc`;
        let result = await query(transactionQuery);
        if (result.length === 0) {
          return res
            .status(200)
            .send({ success: true, message: "No data for the past 7 days" });
        }
        return res
          .status(200)
          .send({ success: true, message: "Fetching works!", result });
      }

      let transactionQuery = `select date(created_at) as date, sum(total_amount) as total_amount, count(distinct id_order) as total_orders from orders where date(created_at) >= "${startDate}" and date(created_at) <= "${endDate}" group by 1 order by 1 desc`;
      if (startDate === endDate) {
        let transactionQuery = `select date(created_at) as date, sum(total_amount) as total_amount, count(distinct id_order) as total_orders from orders where date(created_at) = "${startDate}" group by 1 order by 1 desc`;
      }
      let result = await query(transactionQuery);

      if (result.length === 0) {
        return res.status(200).send({
          success: false,
          message: `No data available, display transaction for the past 7 days`,
        });
      }
      res
        .status(200)
        .send({ success: true, message: "Fetching works!", result });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  fetchMonthlyTransaction: async (req, res) => {
    try {
      const { startDate, endDate } = req.body.dateRange;
      if (!startDate && !endDate) {
        const currentDate = format(Date.now(), "yyyy-MM-dd");
        const sevenDaysAgo = format(
          add(Date.now(), { days: -7 }),
          "yyyy-MM-dd"
        );
        // let transactionQuery = `select transaction_product.idtransaction, product.name, category.name as category, transaction_product.quantity, product.price as pricePerPiece, transaction.totalPrice, transaction.date from transaction_product inner join transaction on transaction_product.idtransaction = transaction.idtransaction inner join product on transaction_product.idproduct = product.idproduct inner join category on product.idcategory = category.idcategory where transaction.iduser=${id} and transaction.date between "${sevenDaysAgo}" and "${currentDate}" order by transaction.idtransaction asc`;
        let transactionQuery = `select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, sum(total_amount) total_amount, count(distinct id_order) total_orders from orders where date(created_at) >= "${sevenDaysAgo}" and date(created_at) <= "${currentDate}" group by 1 order by 1 desc`;
        let result = await query(transactionQuery);
        if (result.length === 0) {
          return res
            .status(200)
            .send({ success: true, message: "No data for the past 7 days" });
        }
        return res
          .status(200)
          .send({ success: true, message: "Fetching works!", result });
      }

      let transactionQuery = `select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, sum(total_amount) total_amount, count(distinct id_order) total_orders from orders where date(created_at) >= "${startDate}" and date(created_at) <= "${endDate}" group by 1 order by 1 desc`;
      // res.status(200).send({ message: "fetching works!" });
      if (startDate === endDate) {
        let transactionQuery = `select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, sum(total_amount) total_amount, count(distinct id_order) total_orders from orders where date(created_at) = "${startDate}" group by 1 order by 1 desc`;
      }
      let result = await query(transactionQuery);

      if (result.length === 0) {
        return res.status(200).send({
          success: false,
          message: `No data available, display transaction for the past 7 days`,
        });
      }
      res
        .status(200)
        .send({ success: true, message: "Fetching works!", result });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  fetchMonthlyCategoryTransaction: async (req, res) => {
    try {
      const { startDate, endDate } = req.body.dateRange;

      if (!startDate && !endDate) {
        const currentDate = format(Date.now(), "yyyy-MM-dd");
        const sevenDaysAgo = format(
          add(Date.now(), { days: -7 }),
          "yyyy-MM-dd"
        );
        // let transactionQuery = `select transaction_product.idtransaction, product.name, category.name as category, transaction_product.quantity, product.price as pricePerPiece, transaction.totalPrice, transaction.date from transaction_product inner join transaction on transaction_product.idtransaction = transaction.idtransaction inner join product on transaction_product.idproduct = product.idproduct inner join category on product.idcategory = category.idcategory where transaction.iduser=${id} and transaction.date between "${sevenDaysAgo}" and "${currentDate}" order by transaction.idtransaction asc`;
        let transactionQuery = `with orderss as (
                    select oi.id_item, oi.id_user, oi.id_order, oi.product_name, oi.product_price, oi.quantity, 
                    p.id_category, c.name product_category, o.created_at, o.status, p.price*oi.quantity total_amount_product 
                    from order_items as oi 
                    left join orders as o on oi.id_order = o.id_order
                    left join products as p on oi.product_name = p.name
                    left join categories as c on p.id_category = c.id_category
                    order by 1 asc)
                    select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, 
                    product_category, 
                    sum(total_amount_product) total_amount, count(distinct id_order) total_orders 
                    from orderss
                    where date(created_at) >= "${sevenDaysAgo}" and date(created_at) <= "${currentDate}" 
                    group by 1,2
                    order by 1 asc, total_amount desc`;
        let result = await query(transactionQuery);
        if (result.length === 0) {
          return res
            .status(200)
            .send({ success: true, message: "No data for the past 7 days" });
        }
        return res
          .status(200)
          .send({ success: true, message: "Fetching works!", result });
      }

      let transactionQuery = `with orderss as (
                select oi.id_item, oi.id_user, oi.id_order, oi.product_name, oi.product_price, oi.quantity, 
                p.id_category, c.name product_category, o.created_at, o.status, p.price*oi.quantity total_amount_product 
                from order_items as oi 
                left join orders as o on oi.id_order = o.id_order
                left join products as p on oi.product_name = p.name
                left join categories as c on p.id_category = c.id_category
                order by 1 asc)
                select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, 
                product_category, 
                sum(total_amount_product) total_amount, count(distinct id_order) total_orders 
                from orderss
                where date(created_at) >= "${startDate}" and date(created_at) <= "${endDate}" 
                group by 1,2
                order by 1 asc, total_amount desc`;

      // res.status(200).send({ message: "fetching works!" });
      if (startDate === endDate) {
        let transactionQuery = `with orderss as (select oi.id_item, oi.id_user, oi.id_order, oi.product_name, oi.product_price, oi.quantity, 
                    p.id_category, c.name product_category, o.created_at, o.status, p.price*oi.quantity total_amount_product 
                    from order_items as oi 
                    left join orders as o on oi.id_order = o.id_order
                    left join products as p on oi.product_name = p.name
                    left join categories as c on p.id_category = c.id_category
                    order by 1 asc)
                    select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, 
                    product_category, 
                    sum(total_amount_product) total_amount, count(distinct id_order) total_orders 
                    from orderss
                    where date(created_at) = "${startDate}" 
                    group by 1,2
                    order by 1 asc, total_amount desc`;
      }
      let result = await query(transactionQuery);

      if (result.length === 0) {
        return res.status(200).send({
          success: false,
          message: `No data available, display transaction for the past 7 days`,
        });
      }
      res
        .status(200)
        .send({ success: true, message: "Fetching works!", result });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  fetchMonthlyProductTransaction: async (req, res) => {
    try {
      const { startDate, endDate } = req.body.dateRange;
      if (!startDate && !endDate) {
        const currentDate = format(Date.now(), "yyyy-MM-dd");
        const sevenDaysAgo = format(
          add(Date.now(), { days: -7 }),
          "yyyy-MM-dd"
        );
        // let transactionQuery = `select transaction_product.idtransaction, product.name, category.name as category, transaction_product.quantity, product.price as pricePerPiece, transaction.totalPrice, transaction.date from transaction_product inner join transaction on transaction_product.idtransaction = transaction.idtransaction inner join product on transaction_product.idproduct = product.idproduct inner join category on product.idcategory = category.idcategory where transaction.iduser=${id} and transaction.date between "${sevenDaysAgo}" and "${currentDate}" order by transaction.idtransaction asc`;
        let transactionQuery = `with orderss as (select oi.id_item, oi.id_user, oi.id_order, oi.product_name, oi.product_price, oi.quantity, 
                    p.id_category, c.name product_category, o.created_at, o.status, p.price*oi.quantity total_amount_product 
                    from order_items as oi 
                    left join orders as o on oi.id_order = o.id_order
                    left join products as p on oi.product_name = p.name
                    left join categories as c on p.id_category = c.id_category
                    order by 1 asc)
                    select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, 
                    product_name, 
                    sum(total_amount_product) total_amount, count(distinct id_order) total_orders 
                    from orderss
                    where date(created_at) >= "${sevenDaysAgo}" and date(created_at) <= "${currentDate}" 
                    group by 1,2
                    order by 1 asc, total_amount desc`;
        let result = await query(transactionQuery);
        if (result.length === 0) {
          return res
            .status(200)
            .send({ success: true, message: "No data for the past 7 days" });
        }
        return res
          .status(200)
          .send({ success: true, message: "Fetching works!", result });
      }

      let transactionQuery = `with orderss as (select oi.id_item, oi.id_user, oi.id_order, oi.product_name, oi.product_price, oi.quantity, 
                p.id_category, c.name product_category, o.created_at, o.status, p.price*oi.quantity total_amount_product 
                from order_items as oi 
                left join orders as o on oi.id_order = o.id_order
                left join products as p on oi.product_name = p.name
                left join categories as c on p.id_category = c.id_category
                order by 1 asc)
                select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, 
                product_name, 
                sum(total_amount_product) total_amount, count(distinct id_order) total_orders 
                from orderss
                where date(created_at) >= "${startDate}" and date(created_at) <= "${endDate}" 
                group by 1,2
                order by 1 asc, total_amount desc`;

      // res.status(200).send({ message: "fetching works!" });
      if (startDate === endDate) {
        let transactionQuery = `with orderss as (select oi.id_item, oi.id_user, oi.id_order, oi.product_name, oi.product_price, oi.quantity, 
                    p.id_category, c.name product_category, o.created_at, o.status, p.price*oi.quantity total_amount_product 
                    from order_items as oi 
                    left join orders as o on oi.id_order = o.id_order
                    left join products as p on oi.product_name = p.name
                    left join categories as c on p.id_category = c.id_category
                    order by 1 asc)
                    select concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months, 
                    product_name, 
                    sum(total_amount_product) total_amount, count(distinct id_order) total_orders 
                    from orderss
                    where date(created_at) = "${startDate}" 
                    group by 1,2
                    order by 1 asc, total_amount desc`;
      }
      let result = await query(transactionQuery);

      if (result.length === 0) {
        return res.status(200).send({
          success: false,
          message: `No data available, display transaction for the past 7 days`,
        });
      }
      res
        .status(200)
        .send({ success: true, message: "Fetching works!", result });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
