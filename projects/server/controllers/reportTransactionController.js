const { db, query } = require(`../database/index`);
const format = require(`date-fns/format`);
const add = require(`date-fns/add`);

module.exports = {
    fetchTransactionOnDateRange: async (req, res) => {
        try {
            // const { id } = req.params;
            const { startDate, endDate } = req.body.dateRange;
            // console.log(req.params);
            // console.log(req.body);
            console.log("start", startDate)
            console.log("end", endDate)
            console.log(req.body)
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
            // res.status(200).send({ message: "fetching works!" });
            console.log(transactionQuery)
            if (startDate === endDate) {
                let transactionQuery = `select date(created_at) as date, sum(total_amount) as total_amount, count(distinct id_order) as total_orders from orders where date(created_at) = "${startDate}" group by 1 order by 1 desc`;
                // transactionQuery = `select transaction_product.idtransaction, product.name, category.name as category, transaction_product.quantity, product.price as pricePerPiece, transaction.totalPrice, transaction.date from transaction_product inner join transaction on transaction_product.idtransaction = transaction.idtransaction inner join product on transaction_product.idproduct = product.idproduct inner join category on product.idcategory = category.idcategory where transaction.iduser=${id} and transaction.date="${startDate}" order by transaction.idtransaction asc`;
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
            // console.log(req)
            // const { id } = req.params;
            const { startDate, endDate } = req.body.dateRange;
            // console.log(req.params);
            console.log(req.body);
            console.log("start", startDate)
            console.log("end", endDate)
            console.log(req.body)
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
            console.log(transactionQuery)
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
            // console.log(req)
            // const { id } = req.params;
            const { startDate, endDate } = req.body.dateRange;
            // console.log(req.params);
            console.log(req.body);
            console.log("start", startDate)
            console.log("end", endDate)
            console.log(req.body)
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
                    order by 1 asc, total_amount desc`
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
            console.log(transactionQuery)
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
                    order by 1 asc, total_amount desc`            }
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
            // console.log(req)
            // const { id } = req.params;
            const { startDate, endDate } = req.body.dateRange;
            // console.log(req.params);
            console.log(req.body);
            console.log("start", startDate)
            console.log("end", endDate)
            console.log(req.body)
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
                    order by 1 asc, total_amount desc`
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
            console.log(transactionQuery)
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
                    order by 1 asc, total_amount desc`            }
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
    }
}