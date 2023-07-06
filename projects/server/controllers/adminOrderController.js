require("dotenv").config({
  path: ".env.local",
});
const { db, query } = require("../database");
const { getPaginationParams } = require("../helper/getPaginationHelper");
const adminOrderQueries = require("../queries/adminOrderQueries");

module.exports = {
  fetchPaymentConfirmation: async (req, res) => {
    try {
      const orderPaymentList = await query(
        'SELECT * FROM multi_warehouse.orders WHERE status = "Menunggu Konfirmasi Pembayaran";'
      );
      return res.status(200).send(orderPaymentList);
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
  confirmPayment: async (req, res) => {
    try {
      const { id_order } = req.query;

      const updateStatus = await query(`
        UPDATE orders
        SET status = "Diproses"
        WHERE id_order = ${db.escape(id_order)}
      `);

      const fetchOrder = await query(`
    SELECT oi.id_user,oi.id_order, p.id_product,oi.quantity, s.id_warehouse,s.total_stock
    FROM orders o
    INNER JOIN order_items oi ON o.id_order = oi.id_order
    INNER JOIN products p ON oi.product_name = p.name
    INNER JOIN stocks s ON p.id_product = s.id_product
    WHERE o.id_order = ${db.escape(
      id_order
    )}  AND s.id_warehouse = o.id_warehouse;
    `);

      if (fetchOrder.length > 0) {
        for (const item of fetchOrder) {
          const { id_order, id_product, quantity, id_warehouse, total_stock } =
            item;

          if (total_stock < quantity) {
            const stockShortage = quantity - total_stock;
            console.log(id_product, "total stock kurang");
            // Lakukan mutasi stok karena stok tidak mencukupi
            const warehouseNearnest = await query(`  SELECT *,
                  SQRT(POW((latitude - (SELECT latitude FROM warehouses WHERE id_warehouse = 30)), 2) + POW((longitude - (SELECT longitude FROM warehouses WHERE id_warehouse = 30)), 2)) AS distance
                  FROM warehouses
                  WHERE id_warehouse <> ${id_warehouse}
                  ORDER BY distance;`);
            // console.log(warehouseNearnest);
            console.log(stockShortage, "kurangnya");

            let isProductAvailable = false;

            for (const nearestWarehouse of warehouseNearnest) {
              const checkStock = await query(`
                    SELECT total_stock
                    FROM stocks
                    WHERE id_warehouse = ${nearestWarehouse.id_warehouse}
                    AND id_product = ${id_product}
                  `);

              if (checkStock[0].total_stock >= stockShortage) {
                console.log(checkStock[0].total_stock, "ini stocknya");
                console.log(stockShortage, "ini");
                console.log("adanya di", nearestWarehouse.id_warehouse);
                // Warehouse terdekat memiliki stok yang cukup

                // Lakukan proses mutasi stok atau update stok di sini
                const createMutation =
                  await query(`INSERT INTO stock_mutations (id_product, id_request_warehouse, id_send_warehouse, quantity, created_at)
                VALUES (${id_product}, ${id_warehouse}, ${nearestWarehouse.id_warehouse}, ${stockShortage}, CURRENT_TIMESTAMP);`);

                const updateStockSendWarehouse = await query(
                  `UPDATE stocks SET total_stock = total_stock - ${stockShortage} WHERE id_product = ${id_product} AND id_warehouse = ${nearestWarehouse.id_warehouse};`
                );

                const updateStockRequetWarehouse = await query(
                  `UPDATE stocks SET total_stock = total_stock + ${stockShortage} WHERE id_product = ${id_product} AND id_warehouse = ${id_warehouse};`
                );

                const createHistoryRequetWarehouse = await query(`
                INSERT INTO stock_history (id_product, stock_change, status, created_at)
                VALUES (${id_product}, ${quantity}, "incoming", CURRENT_TIMESTAMP);
               `);

                const createHistorySendWarehouse = await query(`
             INSERT INTO stock_history (id_product, stock_change, status, created_at)
             VALUES (${id_product}, ${quantity}, "outgoing", CURRENT_TIMESTAMP);
            `);

                // Set flag foundWarehouse menjadi true untuk keluar dari perulangan
                isProductAvailable = true; // Setel menjadi true jika produk tersedia di setidaknya satu gudang
                break;
              }
            }

            if (!isProductAvailable) {
              console.log(
                `Stok tidak tersedia untuk produk dengan ID ${id_product} di seluruh gudang`
              );
              isAnyProductUnavailable = true; // Setel menjadi true jika setidaknya satu produk tidak tersedia di semua gudang
            }
          }

          console.log(id_product, "stock cukup");
          // Update total_stock dengan pengurangan quantity
          const updateStock = await query(
            `UPDATE stocks SET total_stock = total_stock - ${quantity} WHERE id_product = ${id_product} AND id_warehouse = ${id_warehouse};`
          );

          const createHistory = await query(`
            INSERT INTO stock_history (id_product, stock_change, status, created_at)
            VALUES (${id_product}, ${quantity}, "outgoing", CURRENT_TIMESTAMP);
            `);
        }
      }

      return res
        .status(200)
        .send({ success: true, message: "Payment Success" });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
  rejectPayment: async (req, res) => {
    try {
      return res
        .status(200)
        .send({ success: true, message: "Payment Rejected" });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },

  fetchOrderList: async (req, res) => {
    try {
      const itemsPerPage = 8;
      const { page, offset } = getPaginationParams(req, itemsPerPage);
      const { sort, search, status } = req.query;

      const orderPaymentList = await query(
        adminOrderQueries.orderPaymentListQuery(
          itemsPerPage,
          offset,
          sort,
          search,
          status
        )
      );

      countQuery = adminOrderQueries.getCountQueryWithSearchAndStatus(
        search,
        status
      );

      const countResult = await query(countQuery);
      const totalItems = countResult[0].total;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      return res
        .status(200)
        .send({ orderPaymentList, totalPages, itemsPerPage });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
};
