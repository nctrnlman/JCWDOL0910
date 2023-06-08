const { db, query } = require('../database')

module.exports = {
    getLatestProducts: async (req, res) => {
        try {
            const latest_products = await query(`SELECT * FROM products order by id_product desc limit 5`)
            console.log(latest_products)
            return res.status(200).send(latest_products)
        } catch (error) {
            return res.status(error.statusCode || 500).send(error)
        }
    }
}
