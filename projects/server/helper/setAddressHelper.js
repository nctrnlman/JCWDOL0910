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

      // Find the matching province by name
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
            key: "ed6ae7b0b112eff93fb952c91378bb1d",
          },
        }
      );
      const cities = cityResponse.data.rajaongkir.results;
      console.log(cities);
      // Find the matching city by name
      const selectedCity = cities.find(
        (city) =>
          `${city.type.toLowerCase()} ${city.city_name.toLowerCase()}` ===
          cityName.toLowerCase()
      );

      console.log(selectedCity, "selected city");
      if (!selectedCity) {
        throw new Error("City not found");
      }

      // Return the selected province and city data
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
