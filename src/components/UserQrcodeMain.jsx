import { Accordion } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import UserAndProductNavigationBtn from "./UserAndProductNavigationBtn";
import "../assets/css/user.css";
import { useSelector } from "react-redux";
import QrcodeAccordNav from "./qrcode/QrcodeAccordNav";

const UserQrcodeMain = (props) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const [userSlug, setUserSlug] = useState(userInfo?.user?._id);
  let slugUrl;
  if (userInfo?.user?.role === "business") {
    slugUrl = `/business/${userSlug}/qrcode`;
  }
  if (userInfo?.user?.role === "user") {
    slugUrl = `/user/${userSlug}/qrcode`;
  }
  return (
    <>
      <section className="product-d-menu text-capitalize user-favorites">
        <h3 className="user-favorites-a">QR Code</h3>

        {/* Qr code tab */}
        <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}`}
          slugUrlT={`${slugUrl}/`}
          title="QR Code"
        />
        {userInfo?.user?.role === "business" && (
          <Accordion>
            {products?.product?.filter(
              (curEl) => curEl.categorySlug === "historical-monuments"
            ).length > 0 && (
              <QrcodeAccordNav
                catSlug="historical-monuments"
                slugUrl={slugUrl}
              />
            )}
            {products?.product?.filter(
              (curEl) => curEl.categorySlug === "tourist-places"
            ).length > 0 && (
              <QrcodeAccordNav catSlug="tourist-places" slugUrl={slugUrl} />
            )}

            {products?.product?.filter(
              (curEl) => curEl.categorySlug === "attractions"
            ).length > 0 && (
              <QrcodeAccordNav catSlug="attractions" slugUrl={slugUrl} />
            )}

            {products?.product?.filter(
              (curEl) => curEl.categorySlug === "beaches"
            ).length > 0 && (
              <QrcodeAccordNav catSlug="beaches" slugUrl={slugUrl} />
            )}

            {products?.product?.filter(
              (curEl) => curEl.categorySlug === "religious-places"
            ).length > 0 && (
              <QrcodeAccordNav catSlug="religious-places" slugUrl={slugUrl} />
            )}
            {products?.product?.filter((curEl) => curEl.categorySlug === "other")
              .length > 0 && (
              <QrcodeAccordNav catSlug="other" slugUrl={slugUrl} />
            )}
          </Accordion>
        )}
      </section>
      <section className="product-d-detail">
        <Outlet />
      </section>
    </>
  );
};

export default UserQrcodeMain;
