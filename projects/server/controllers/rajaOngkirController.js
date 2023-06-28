const axios = require("axios");
require("dotenv").config({
  path: ".env.local",
});
const env = process.env;
const API_KEY = env.RAJA_ONGKIR_API_KEY;
const BASE_URL = "https://api.rajaongkir.com/starter";

// Helper function for making requests to the RAJA ONGKIR API
const makeRequest = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        key: API_KEY,
      },
    });
    return response.data.rajaongkir.results;
  } catch (error) {
    console.error("Error making request to RAJA ONGKIR API: ", error);
    throw error;
  }
};

const getProvinces = async (req, res) => {
  try {
    const url = `${BASE_URL}/province`;
    const provinces = await makeRequest(url);
    res.status(200).json(provinces);
  } catch (error) {
    res.status(500).json({ error: "Error fetching provinces" });
  }
};

const getCitiesByProvince = async (req, res) => {
  try {
    const { provinceId } = req.params;
    const url = `${BASE_URL}/city?province=${provinceId}`;
    const cities = await makeRequest(url);
    console.log(cities, "cities");
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cities" });
  }
};

module.exports = {
  getProvinces,
  getCitiesByProvince,
};
