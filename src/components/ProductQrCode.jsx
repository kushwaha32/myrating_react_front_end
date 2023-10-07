import UserResourceCommonContainer from "./UserResourceCommonContainer";
import ImgWithSideCaption from "./ImgWithSideCaption";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import QRCodeGenerator from "./business/QrcodeGenerator";
import QRCodeScanner from "./business/QrcodeScanner";
import { useGetProductBasedSlugMutation } from "../slices/productsApiSlice";

const ProductQrCode = () => {
  const [product, setProduct] = useState();
  const location = useLocation().pathname.split("/");
  const origin = window.location.origin;
  const productSlug = location[location.length - 1];
  const url = `${origin}/product/${productSlug}`;

  const [getProductBasedOnSlug, { isLoading }] =
    useGetProductBasedSlugMutation();

  // Use a ref to keep track of the previous productSlug
  const prevProductSlugRef = useRef();
  useEffect(() => {
    // Check if the productSlug changed after the initial render
    if (prevProductSlugRef.current !== productSlug) {
      getUpdateInfo();
    }

    // Update the previous productSlug value after the render
    prevProductSlugRef.current = productSlug;
  }, [productSlug]);

  const getUpdateInfo = async () => {
    try {
      const res = await getProductBasedOnSlug({
        productSlug: productSlug,
      }).unwrap();
      console.log(res);
      if (res?.status === "success") {
        setProduct(res?.data?.product);
      }
    } catch (error) {}
  };

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div className="wallet user-menu qrcode">
          <UserResourceCommonContainer edit={false} title="QR Code">
            <ImgWithSideCaption
              img={product?.proifleImg}
              title={product?.productName}
            >
              <span className="user-menu-a text-capitalize">
                {product?.category}
              </span>
              <span className="user-menu-a text-capitalize">
                {product?.location?.address}
              </span>
              <QRCodeGenerator data={url} />
            </ImgWithSideCaption>
          </UserResourceCommonContainer>
          <QRCodeScanner />
        </div>
      )}
    </>
  );
};

const style = {
  color: "#000",
  padding: "9px 14px",
};

export default ProductQrCode;
