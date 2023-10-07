import { Link, Outlet } from "react-router-dom";
import taj from "../../img/taj.jpg";
import scoreImg from "../../img/scoreStar.png";
import iImg from "../../img/iImg.png";
import ShadowLayout from "../ShadowLayout";
import ImgWithSideCaption from "../ImgWithSideCaption";
import { useEffect, useState } from "react";
import UserAndProductNavigationBtn from "../UserAndProductNavigationBtn";
import "../../assets/css/user.css";
import "../../assets/css/business.css";
import dots from "../../img/dots.png";
import plus from "../../img/plus.png";
import { useSelector } from "react-redux";
import { useCategoryIfHasProductsMutation } from "../../slices/categoryApiSlice";

const BusinessRatingMain = (props) => {
  // get userInfo
  const { userInfo } = useSelector((state) => state.auth);
  const [userSlug, setUserSlug] = useState(userInfo?.user?._id);
  const [subCategory, setSubCategory] = useState([]);
  const slugUrl = `/business/${userSlug}/ratings`;

  const [categoryIfHasProducts, { isLoading }] =
    useCategoryIfHasProductsMutation();

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const res = await categoryIfHasProducts().unwrap();
      if(res.status === "success"){
        
         setSubCategory(res?.data?.category);
      }
     
    } catch (error) {}
  };
  return (
    <>
      <section className="product-d-menu text-capitalize user-menu business">
        <ShadowLayout>
          <img className="dots" src={dots} alt="dots" />
          <ImgWithSideCaption
            img={userInfo?.user?.brandProfile?.brandImage || "man.png"}
            title={userInfo?.user?.brandProfile?.brandName}
          >
            <span className="user-menu-a text-capitalize">
              {userInfo?.user?.brandProfile?.registeredAs?.name}
            </span>
          </ImgWithSideCaption>
        </ShadowLayout>

        <Link
          className="addProfile"
          target="_blank"
          to={`/business/${userInfo?.user?._id}/create-profile`}
        >
          Add Profile
        </Link>
        <img src={plus} className="plus" alt="plus" />

        {/* navigation  */}
        <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}`}
          slugUrlT={`${slugUrl}/`}
          title="All Products"
        />
        {isLoading ? (
          <>Loading...</>
        ) : (
          <>
            {subCategory?.map((currCat) => {
              return (
                <>
                  {currCat?.products?.length > 0 && (
                    <>
                      <UserAndProductNavigationBtn
                        slugUrlO={`${slugUrl}/${currCat?.slug}`}
                        slugUrlT={`${slugUrl}/${currCat?.slug}/`}
                        title={currCat?.name}
                      />
                    </>
                  )}
                </>
              );
            })}
          </>
        )}
      </section>
      <section className="product-d-detail">
        <Outlet />
      </section>
    </>
  );
};

export default BusinessRatingMain;
