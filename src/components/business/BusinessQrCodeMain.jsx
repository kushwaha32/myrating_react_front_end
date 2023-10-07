import { Accordion } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../assets/css/user.css";
import { useSelector } from "react-redux";
import UserAndProductNavigationBtn from "../UserAndProductNavigationBtn";
import QrcodeAccordNav from "../qrcode/QrcodeAccordNav";
import { useCategoryIfHasProductsMutation } from "../../slices/categoryApiSlice";

const BusinessQrcodeMain = (props) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const [subCategory, setSubCategory] = useState();
  const [userSlug, setUserSlug] = useState(userInfo?.user?._id);

  let slugUrl = `/business/${userSlug}/qrcode`;

  const [categoryIfHasProducts, { isLoading }] =
    useCategoryIfHasProductsMutation();

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const res = await categoryIfHasProducts().unwrap();
      if (res.status === "success") {
        setSubCategory(res.data.category);
      }
    } catch (error) {}
  };
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

        <Accordion>
          {isLoading ? (
            <>Loading...</>
          ) : (
            <>
              {subCategory?.map((currCat) => {
                return (
                  <>
                    {currCat?.products?.length > 0 && (
                      <>
                        <QrcodeAccordNav
                          catSlug={currCat?.slug}
                          slugUrl={slugUrl}
                          products={currCat?.products}
                        />
                      </>
                    )}
                  </>
                );
              })}
            </>
          )}
        </Accordion>
      </section>
      <section className="product-d-detail">
        <Outlet />
      </section>
    </>
  );
};

export default BusinessQrcodeMain;
