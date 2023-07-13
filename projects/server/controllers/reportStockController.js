const { db, query } = require(`../database/index`);
// const format = require(`date-fns/format`);
// const add = require(`date-fns/add`);

module.exports = {
    fetchStockMovementHistory: async (req, res) => {
        try {
            // const { id } = req.params;
            // const { id_warehouse } = req.body;
            // console.log(req.params);
            // console.log(req.body);
            // console.log("start", startDate)
            // console.log("end", endDate)
            // console.log(req.body)

            let stockQuery = `with penambahan_mutasi as (select id_mutation as stock_movement_reference_id, id_product, id_request_warehouse as id_warehouse, quantity, created_at , "stock mutation - receive" as movement_description from stock_mutations),
            pengurangan_mutasi as (select id_mutation as id_stock_movement_reference_id , id_product, id_send_warehouse id_warehouse, -1*quantity as quantity, created_at , "stock mutation - send" as movement_description from stock_mutations),
            orders_and_items as (select oi.*, o.id_warehouse, o.created_at from order_items oi left join orders o on oi.id_order = o.id_order),
            pengurangan_order as (select id_order as id_stock_movement_reference_id, product_name, id_warehouse, -1*quantity as quantity , created_at, "order" as movement_description from orders_and_items),
            history as (select * from ( select * from penambahan_mutasi UNION ALL select * from pengurangan_mutasi UNION ALL select * from pengurangan_order ) as allunion order by created_at asc, stock_movement_reference_id asc),
            history2 as (select * , concat(DATE_FORMAT(created_at, "%m"), ". ", DATE_FORMAT(created_at, "%M"), " ", DATE_FORMAT(created_at, "%Y")) months from history)
            select months, movement_description, stock_movement_reference_id, id_product, id_warehouse, quantity, created_at from history2
            `;

            let result = await query(stockQuery);
            res
                .status(200)
                .send({ success: true, message: "Fetching stock history works!", result });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}