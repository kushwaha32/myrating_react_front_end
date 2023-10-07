import { useState } from "react";
import { useGetS3SecureUrlMutation } from "../../slices/s3bucketApiSlice";
import axios from "axios";

const useGetImageSecureUrl = () => {
  const [getSecureUrl] = useGetS3SecureUrlMutation();

  //   get the secure url
  const handleSecureUrl = async (image) => {
    const res = await getSecureUrl().unwrap();
    if (res.status === "success") {
      const secureUrl = res.uploadUrl;

      // make request to store image to the s3bucket
      await axios(secureUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: image,
      });
      // return image url
      return secureUrl.split("?")[0];
    }
  };
  return handleSecureUrl;
};

export default useGetImageSecureUrl;
