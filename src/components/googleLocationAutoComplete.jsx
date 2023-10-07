import "../assets/css/autocomplete.css";
import React, { useEffect, useRef, useState } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "../utils/googleApiKey";

import location from "../img/location.png";


// Define libraries outside the component
const libraries = ['places'];
const GoogleAutoComplete = ({
  handleLocationSelect,
  errors,
  handleBlur,
  handleChange,
  touched,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });
  const [isGoogleApiLoaded, setGoogleApiLoaded] = useState(false);
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      let formattedAddress = place.formatted_address;
      handleLocationSelect({
        coordinates: [lat, lng],
        address: formattedAddress,
      });
    } else {

    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = new window.google.maps.LatLng(
            latitude,
            longitude
          );
          autocompleteRef.current.setBounds(
            new window.google.maps.LatLngBounds(currentLocation)
          );

          // Set the Autocomplete value directly
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: currentLocation }, (results, status) => {
            if (status === "OK" && results[0]) {
              inputRef.current.value = results[0].formatted_address;

              const lat = results[0].geometry.location.lat();
              const lng = results[0].geometry.location.lng();
              const formatedAddress = results[0].formatted_address;
              handleLocationSelect({
                coordinates: [lat, lng],
                address: formatedAddress,
              });
            } else {
              // console.error('Geocoder failed due to:', status);

              // If geolocation fails, try manual location
              handleManualLocation();
            }
          });
        },
        (error) => {
          // console.error('Error getting current location:', error);
          // If geolocation is not supported, try manual location
          handleManualLocation();  
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  // handle the manual location 
  const handleManualLocation = () => {
    if (inputRef.current && inputRef.current.value.trim() !== '') {
      const address = inputRef.current.value;
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          const lat = location.lat();
          const lng = location.lng();
          const formatedAddress = results[0].formatted_address;
        
          handleLocationSelect({
            coordinates: [lat, lng],
            address: formatedAddress,
          });

          // Pass the latitude and longitude to the parent component
         
        } else {
          console.error('Geocoder failed due to:', status);
        }
      });
    }
  };

  useEffect(() => {
    if (isLoaded) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        { types: ["geocode"] }
      );

      autocompleteRef.current.addListener("place_changed", onPlaceChanged);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      setGoogleApiLoaded(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    // Call handleManualLocation after the Google Maps API library is loaded
    if (isGoogleApiLoaded) {
      handleManualLocation();
    }
  }, [isGoogleApiLoaded]);

  return (
    <>
      {isLoaded && !loadError ? (
        <>
          <div className="form-group loc-profile mt-2">
            <label htmlFor="autocomplete-input" className="profile-field-label">
              Google Location <span className="optional-color">(Optional)</span>{" "}
              <span>*</span>
            </label>

            <input
              type="text"
              className={`form-control location ${
                errors.googleLocation && touched.googleLocation
                  ? "is-invalid"
                  : ""
              }`}
              name="googleLocation"
              id="autocomplete-input"
              ref={inputRef}
              placeholder="Google Location"
              onChange={handleChange}
              onBlur={handleBlur}
              style={style}
            />

            <img
              className="loc-img"
              src={location}
              onClick={handleCurrentLocation}
              alt=""
            />
          </div>
          {errors.googleLocation && touched.googleLocation ? (
            <div className="field-eror">{errors.googleLocation}</div>
          ) : null}
        </>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

const style = {
  paddingRight: "33px"
}
export default GoogleAutoComplete;
