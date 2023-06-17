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
};
