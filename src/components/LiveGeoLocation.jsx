import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import asyncLocalStorage from "../utils/asyncLocalStorage";

const LiveGeoLocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState(null);
 
  useEffect(() => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSuccess =  (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    
   fetchCityName(position.coords.latitude, position.coords.longitude);
  };

  const handleError = (error) => {
    toast.error(error.message);
  };

  const fetchCityName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      const cityName =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.hamlet;
      setCity(cityName || "Unknown City");
      const location = {
        coordinates: [lat, lng],
        address: cityName || "Unknown City"
      }

      await asyncLocalStorage.setItem("location", JSON.stringify(location));
    
    } catch (error) {
      console.log("Error fetching city name:", error);

    }
  };

  return <><div></div></>;
};

export default LiveGeoLocation;
