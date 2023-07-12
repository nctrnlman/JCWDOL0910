const axios = require("axios");
require("dotenv").config({
  path: ".env.local",
});
const env = process.env;
const API_KEY = env.RAJA_ONGKIR_API_KEY;

const getShippingCost = async (origin, destination, weight, courier) => {
  try {
    const response = await axios.post(
      "https://api.rajaongkir.com/starter/cost",
      {
        origin,
        destination,
        weight,
        courier,
      },
      {
        headers: {
          key: API_KEY,
        },
      }
    );
    return response.data.rajaongkir.results[0].costs;
  } catch (error) {
    console.error("Error getting shipping cost from RAJA ONGKIR API: ", error);
    throw error;
  }
};

module.exports = {
  getShippingCost,
};
