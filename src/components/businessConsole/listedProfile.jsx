import "./listedProfile.css";
import pencelImg from "../../img/draw.png";
import magnifyng from "../../img/magnifier.jpeg";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useCategoryIfHasProductsMutation } from "../../slices/categoryApiSlice";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import OtherProfileSkeleton from "./otherProfileSkeleton";

const ListedProfile = () => {
  const location = useLocation()?.pathname.split("/");
  const [subCategory, setSubCategory] = useState(null);
  const [categoryIfHasProducts, { isLoading }] =
    useCategoryIfHasProductsMutation();

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const res = await categoryIfHasProducts().unwrap();
      if (res.status === "success") {
        setSubCategory(res?.data?.category);
      }
    } catch (error) {}
  };
  return (
    <section className="business-console-body business-console-listed-pro">
      <h3 className="text-center my-3 bcb-title">Listed profiles</h3>
      <div className="bcb-profiles-data">
        <div className="bcb-profiles-data-a">
          {/* /////////////////////////////////////////// */}
          {/* ////////------ Create Profile ------/////// */}
          {/* /////////////////////////////////////////// */}
          <Link
            to={`/business/${location[2]}/listed-profile/create-profile`}
            className="d-flex align-items-center justify-content-between bcb-create-profile"
          >
            <span>List a new Profile</span>
            <span>
              <img src={pencelImg} alt="createProfile" />
            </span>
          </Link>

          {/* /////////////////////////////////////////// */}
          {/* /////////------ All Profiles ------//////// */}
          {/* /////////////////////////////////////////// */}
          <Link
            to=""
            className="d-flex align-items-center justify-content-between bcb-create-profile bab-profiles-a bcb-profiles-a-m bab-profiles-a-active"
          >
            <span>All Profiles</span>
          </Link>

          {/* /////////////////////////////////////////// */}
          {/* /////////------ Other Profiles ------////// */}
          {/* /////////////////////////////////////////// */}
          {isLoading ? (
            <>
              {Array.from({ length: 7 })?.map((val, index) => (
                <OtherProfileSkeleton key={index} />
              ))}
            </>
          ) : (
            <>
              {subCategory?.map((curr) => (
                <>
                  {curr?.product?.length > 0 ? (
                    <Link
                      to={`/business/${location}/${curr?.slug}`}
                      className="d-flex align-items-center justify-content-between bcb-create-profile bab-profiles-a"
                    >
                      <span>{curr?.name}</span>
                    </Link>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </>
          )}
        </div>
        <div className="bcb-profiles-data-b">
          <form action="" className="bcb-profiles-data-ba position-relative">
            <input type="text" name="" id="" placeholder="Search" />
            <button type="submit">
              <img src={magnifyng} alt="" />
            </button>
          </form>

          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default ListedProfile;
