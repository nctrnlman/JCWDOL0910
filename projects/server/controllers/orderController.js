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

module.exports = {
  orderList: async (req, res) => {
    try {
      const { status, id_user } = req.query;
      const orderList = await query(
        orderQueries.orderListQuery(id_user, status)
      );
      return res.status(200).send(orderList);
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },

  getShippingWarehouse: async (req, res) => {
    try {
      const { id_user, courier } = req.query;
      const fetchAddress = await query(orderQueries.fetchAddressQuery(id_user));

      const result = await getCoordinates(
        fetchAddress[0].address,
        fetchAddress[0].city,
        fetchAddress[0].province,
        fetchAddress[0].postal_code
      );

      if (!result) {
        throw new Error("Coordinates not found");
      }

      const { latitude, longitude } = result;
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
        address: fetchAddress[0],
      });
    } catch (error) {
      console.log(error);
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
