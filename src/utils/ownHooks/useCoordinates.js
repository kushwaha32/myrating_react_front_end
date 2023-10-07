import axios from "axios";
import { GOOGLE_API_KEY } from "../googleApiKey";

const useCoordinates = () => {
  const handleGetCoordinates = async (city, state, country) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city},${state},${country}&key=${GOOGLE_API_KEY}`
      );

      if (response?.data?.status === "OK") {
        const location = response.data.results[0].geometry.location;
        const lat = location.lat;
        const lng = location.lng;
        console.log(lat, lng);
        return [lat, lng];
      } else {
        console.error("Geocoding request failed");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  return handleGetCoordinates;
};

export default useCoordinates;
