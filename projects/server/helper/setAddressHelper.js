const axios = require("axios");
require("dotenv").config({
  path: ".env.local",
});
const env = process.env;

module.exports = {
  getCoordinates: async (address, district, city, province, postal_code) => {
    try {
      const apiKey = env.OPENCAGE_API_KEY;
      const location = `${address}, ${district}, ${city}, ${province},${postal_code} Indonesia`;
      const response = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            key: apiKey,
            q: location,
            limit: 1,
          },
        }
      );
      const { lat, lng } = response.data.results[0].geometry;
      return { latitude: lat, longitude: lng };
    } catch (error) {
      throw new Error(
        "Error retrieving coordinates from OpenCage Geocoding API"
      );
    }
  },

  checkProvinceAndCity: async (provinceName, cityName) => {
    const apiKey = env.RAJA_ONGKIR_API_KEY;

    try {
      // Make a GET request to retrieve the list of provinces
      const provinceResponse = await axios.get(
        "https://api.rajaongkir.com/starter/province",
        {
          headers: {
            key: apiKey,
          },
        }
      );
      const provinces = provinceResponse.data.rajaongkir.results;

      const selectedProvince = provinces.find(
        (province) =>
          province.province.toLowerCase() === provinceName.toLowerCase()
      );
      if (!selectedProvince) {
        throw new Error("Province not found");
      }

      // Make a GET request to retrieve the list of cities within the selected province
      const cityResponse = await axios.get(
        `https://api.rajaongkir.com/starter/city?province=${selectedProvince.province_id}`,
        {
          headers: {
            key: apiKey,
          },
        }
      );
      const cities = cityResponse.data.rajaongkir.results;

      const selectedCity = cities.find(
        (city) =>
          `${city.type.toLowerCase()} ${city.city_name.toLowerCase()}` ===
          cityName.toLowerCase()
      );

      if (!selectedCity) {
        throw new Error("City not found");
      }

      return {
        province: selectedProvince,
        city: selectedCity,
      };
    } catch (error) {
      console.error("Error checking province and city: ", error);
      throw error;
    }
  },
};
