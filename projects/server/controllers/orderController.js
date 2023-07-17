const {
  getCoordinates,
  checkProvinceAndCity,
} = require("../helper/setAddressHelper");
const { db, query } = require("../database");
const { getIdFromToken } = require("../helper/jwt-payload");
const {
  validateImageSize,
  validateImageExtension,
} = require("../helper/imageValidatorHelper");
const orderQueries = require("../queries/orderQueries");
const { getShippingCost } = require("../helper/getShippingCost");
const { getPaginationParams } = require("../helper/getPaginationHelper");

module.exports = {
  orderList: async (req, res) => {
    try {
      const { status, id_user } = req.query;
      const itemsPerPage = 3;

      const { offset } = getPaginationParams(req, itemsPerPage);

      const orderListQuery = orderQueries.orderListQuery(
        id_user,
        status,
        offset,
        itemsPerPage
      );
      const countQuery = orderQueries.countQuery(id_user, status);

      const [orderItems, countResult] = await Promise.all([
        query(orderListQuery),
        query(countQuery),
      ]);

      const totalItems = countResult[0].total;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      return res.status(200).send({ orderItems, totalPages, itemsPerPage });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },

  getShippingWarehouse: async (req, res) => {
    try {
      const { id_user, id_address, courier } = req.query;

      if (id_address === null || id_address === "") {
        return res
          .status(400)
          .send({ message: "Please check the address first." });
      }

      const fetchAddress = await query(
        orderQueries.fetchAddressQuery(id_address)
      );

      const latitude = fetchAddress[0].latitude;
      const longitude = fetchAddress[0].longitude;

      // const { latitude, longitude } = result;
      const checkNearestWarehouse = await query(
        orderQueries.checkNearestWarehouseQuery(latitude, longitude)
      );

      const originWarehouse = await checkProvinceAndCity(
        checkNearestWarehouse[0].province,
        checkNearestWarehouse[0].city
      );

      const destinationAddress = await checkProvinceAndCity(
        fetchAddress[0].province,
        fetchAddress[0].city
      );

      const checkWeight = await query(orderQueries.checkWeightQuery(id_user));

      const services = await getShippingCost(
        originWarehouse.city.city_id,
        destinationAddress.city.city_id,
        checkWeight[0].total_weight,
        courier.toLowerCase()
      );

      return res.status(200).send({
        service: services,
        warehouse: checkNearestWarehouse[0],
      });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },

  createOrder: async (req, res) => {
    try {
      const {
        id_user,
        id_warehouse,
        total_amount,
        shipping_method,
        productList,
      } = req.body;

      if (id_warehouse === null || id_warehouse === "") {
        return res
          .status(400)
          .send({ message: "Please check the address first." });
      }

      await query(
        orderQueries.insertOrderQuery(
          id_user,
          id_warehouse,
          total_amount,
          shipping_method
        )
      );

      const fetchOrder = await query(orderQueries.fetchOrderQuery(id_user));

      for (const product of productList) {
        const { productName, productPrice, productImage, quantity } = product;
        await query(
          orderQueries.insertOrderItemsQuery(
            id_user,
            fetchOrder,
            productName,
            productPrice,
            productImage,
            quantity
          )
        );
      }

      await query(orderQueries.insertPaymentDetailsQuery(fetchOrder));
      await query(orderQueries.deleteCartItemsQuery(id_user));

      return res
        .status(200)
        .send({ success: true, message: "Create Order Success" });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },

  uploadPayment: async (req, res) => {
    const { orderId } = req.params;
    const { remitter, bank_name, account_number } = req.body;
    try {
      const userId = getIdFromToken(req, res);

      const { file } = req;
      const image = file ? "/" + file.filename : null;

      if (!file) {
        return res.status(400).send("No image file provided");
      }
      if (!validateImageSize(file)) {
        return res.status(400).send("File size exceeds the limit");
      }
      if (!validateImageExtension(file)) {
        return res.status(400).send("Invalid file extension");
      }

      await query(orderQueries.updateOrderStatusQuery(orderId, userId));
      await query(
        orderQueries.updatePaymentDetailsQuery(
          orderId,
          image,
          remitter,
          bank_name,
          account_number
        )
      );

      return res.status(200).send({
        success: true,
        message: "Payment details uploaded successfully.",
      });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  cancelOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      const userId = getIdFromToken(req, res);
      const order = await query(orderQueries.selectOrderQuery(orderId, userId));

      if (!order || order.length === 0) {
        return res.status(404).send({
          error: "Order not found.",
        });
      }

      if (order[0].status === "Dibatalkan") {
        return res.status(400).send({ error: "Order is already canceled." });
      }

      await query(orderQueries.updateOrderCancellationQuery(orderId));
      await query(orderQueries.deletePaymentDetailsQuery(orderId));

      return res
        .status(200)
        .send({ success: true, message: "Order canceled successfully." });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
};
