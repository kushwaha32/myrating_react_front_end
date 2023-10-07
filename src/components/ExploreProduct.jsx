import "../assets/css/filterProduct.css";
import filterImg from "../img/filter-img.png";
import { useEffect, useState } from "react";
import ButtonFormSubmit from "./buttonFormSubmit";
import searchIcon from "../img/search-icon.png";
import SearchSuper from "./searchSuper";
import filterColored from "../img/filter-colored.png";
import Header from "./header";
import { IsTabletOrLess } from "../utils/mediaScreens";
import UserSideNavBelow767 from "./header/UserSideNavBelow767.98";
import { useDispatch, useSelector } from "react-redux";
import ProductBluePrint from "./ProductBluePrint";
import LocationFilter from "./exploreFilters/locationFilter";
import CategoryDropDown from "./exploreFilters/categoryDropDown";
import CategorySubCatDrop from "./exploreFilters/categorySubCatDrop";
import { useGetBrandIndustryQuery } from "../slices/brandIndustryApiSlice";
import RatingFilter from "./exploreFilters/ratingFilter";
import { useGetFilteredProductsWithBrandMutation } from "../slices/productsApiSlice";
import { setFilterProducts } from "../slices/filterProductSlice";
import ProductTopBrandBluePrint from "./ProductTopBrandBluprint";

const ExploreProduct = () => {
  const [query, setQuery] = useState({ page: 1, limit: 6 });
  const [selectedDistance, setSelectedDistance] = useState({});
  const [searchLoading, setSearchLoading] = useState(false);
  const [getFilteredProductWithBrand, { isLoading: filterLoadingWithBand }] =
    useGetFilteredProductsWithBrandMutation();

  const [subCategory, setSubCategory] = useState();
  const [searchInput, setSearchInput] = useState();
  // get the filtered products
  const { filterProducts } = useSelector((state) => state.filterProducts);
  // side nav state
  const [userSideNav, setUserSideNav] = useState(false);

  // get the all the industry
  const { data, isLoading } = useGetBrandIndustryQuery();
  // destructure the category from the data

  const [catOptionValue, setCatoptionValue] = useState();
  const [subCat, setSubCat] = useState([]);
  const [profilesOptionValue, setProfilesOptionValue] = useState();

  const [ratingOptionValue, setRatingOptionValue] = useState();
  // filter toggle state
  const [filterToggle, setFilterToggle] = useState(false);

  const handleCatOptionValue = (el) => {
    setCatoptionValue(el?.name);
    setProfilesOptionValue("Select Profile");
    setSubCat(
      data?.data?.industry?.filter((currCat) => currCat?._id === el?._id)
    );
  };
  const handleProfilesOptionValue = (el) => {
    setProfilesOptionValue(el.name);
    setSubCategory(el._id);
  };
  // handle rating option
  const handleRatingOption = (el) => {
    setRatingOptionValue(el);
  };
  // side nav
  const handleUserSideNav = () => {
    setUserSideNav(!userSideNav);
  };

  // handle clear filter
  const handleClearFilter = () => {
    setSelectedDistance({});
    setQuery({ page: 1, limit: 6 });
    setCatoptionValue("");
    setRatingOptionValue("");
  };
  // set the filter value on load
  useEffect(() => {
    let oldQuery = JSON?.parse(localStorage.getItem("query"));
    if (oldQuery) {
      setQuery({
        ...query,
        ...oldQuery,
        subCategory: oldQuery?.subCategory?.id,
      });
      oldQuery?.city
        ? setSelectedDistance({ city: oldQuery?.city })
        : setSelectedDistance({ cordinate: oldQuery?.distance });

      setCatoptionValue(oldQuery?.subCategory?.name);
      setSearchInput(oldQuery?.searchField)
      localStorage.removeItem("query")
    }
  }, []);

  // filter product mutation
  const dispatch = useDispatch();

  const getFilterResult = async () => {
    try {
      if (searchInput) {
        setQuery({ ...query, searchField: searchInput });
        const res = await getFilteredProductWithBrand({
          ...query,
          searchField: searchInput,
        }).unwrap();

        if (res.status === "success") {
          dispatch(setFilterProducts(res.products));
        }
      }
    } catch (error) {}
  };

  const handleEnterPress = async (e) => {
    try {
      if (e.key === "Enter") {
        if (searchInput) {
          setQuery({ ...query, searchField: searchInput });
          const res = await getFilteredProductWithBrand({
            ...query,
            searchField: searchInput,
          }).unwrap();

          if (res.status === "success") {
            dispatch(setFilterProducts(res.products));
          }
        }
      }
    } catch (error) {}
  };
  return (
    <>
      {/* header */}
      <Header handleUserSideNav={handleUserSideNav} />
      {/* user side nav below 767.98px */}
      {IsTabletOrLess() && (
        <UserSideNavBelow767
          handleUserSideNav={handleUserSideNav}
          userSideNav={userSideNav}
        />
      )}
      {(filterLoadingWithBand || searchLoading) && (
        <div className="loading_filter">
          <div
            className="spinner-border"
            style={{ position: "absolute", top: "50%", left: "50%" }}
          ></div>
        </div>
      )}
      {/* filter body */}
      <div className="filter container">
        <div
          className={`filter-sm-shadow ${
            filterToggle ? "filter-sm-shadow-active" : ""
          }`}
          onClick={() => setFilterToggle(!filterToggle)}
        ></div>
        <div
          className={`filter-left ${filterToggle ? "filter-left-active" : ""}`}
        >
          <figure className="filter-left-a">
            <figcaption>Filters</figcaption>
            <div className="filter-right-a-uncolored">
              <img src={filterImg} alt="" />
            </div>
            <div
              className="filter-right-a-clored"
              onClick={() => setFilterToggle(!filterToggle)}
            >
              <img src={filterColored} alt="" />
            </div>
          </figure>
          {/* nearby Location Dropdown */}
          <LocationFilter
            selectedDistance={selectedDistance}
            setSelectedDistance={setSelectedDistance}
            query={query}
            setQuery={setQuery}
            setSearchLoading={setSearchLoading}
          />

          {/* categories Dropdown */}
          <div className="profiles">
            <CategoryDropDown
              handleOptionValue={handleCatOptionValue}
              optionValue={catOptionValue}
              fields={data}
              query={query}
              setQuery={setQuery}
              setSearchLoading={setSearchLoading}
            />
          </div>
          {/* profile dropdown */}
          <div className="profiles">
            <CategorySubCatDrop
              handleOptionValue={handleProfilesOptionValue}
              optionValue={profilesOptionValue}
              fields={subCat}
              query={query}
              setQuery={setQuery}
              setSearchLoading={setSearchLoading}
            />
          </div>
          {/* rating dropdown */}
          <div className="profiles">
            <RatingFilter
              handleOptionValue={handleRatingOption}
              optionValue={ratingOptionValue}
              query={query}
              setQuery={setQuery}
              setSearchLoading={setSearchLoading}
            />
          </div>
          <div className="text-center">
            <button
              onClick={handleClearFilter}
              className="btn btn-form color-yellow-dark"
              style={style}
            >
              Clear Filter
            </button>
          </div>
        </div>

        <div className="filter-right">
          <div className="filter-right-a">
            <div
              className="filter-right-a-clored"
              onClick={() => setFilterToggle(!filterToggle)}
            >
              <img src={filterColored} alt="" />
            </div>
            <SearchSuper cclass="search-width">
              <img
                src={searchIcon}
                className="search-img"
                alt=""
                onClick={getFilterResult}
              />
              <input
                type="text"
                id="search"
                className="search-input"
                placeholder="Search Palces...."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleEnterPress}
              />
            </SearchSuper>
          </div>
          {/* search results */}

          {filterProducts?.length > 0 ? (
            <>
              {filterProducts?.map(
                (currRow) => (
                  // printing the products brand
                  <>
                    {currRow?.products?.length > 0 && (
                      <>
                        <h1 className="category-title" style={titleStyle}>
                          Products
                        </h1>
                        <div className="filter-right-b">
                          {currRow?.products?.map((product) => (
                            <div key={product._id}>
                              <ProductBluePrint
                                productImg={product?.proifleImg}
                                productOwnerImg={
                                  product?.user?.brandProfile?.brandImage ||
                                  "man.png"
                                }
                                title={product?.productName}
                                rating={product?.averageRating}
                                product={product}
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {currRow?.brand?.length > 0 && (
                      <>
                        <h1 className="category-title" style={titleStyle}>
                          Top Brands
                        </h1>
                        <div className="filter-right-b">
                          {currRow?.brand?.map((curBrand) => (
                            <ProductTopBrandBluePrint
                              brandImg={curBrand?.brandImage}
                              title={curBrand?.brandName}
                              brandSlug={curBrand?.brandNameSlug}
                            />
                          ))}
                        </div>{" "}
                      </>
                    )}
                  </>
                )
                // printing the brand
              )}
            </>
          ) : (
            <h4 className="text-center">There no Products</h4>
          )}
        </div>
      </div>
    </>
  );
};
const titleStyle = {
  padding: "19px 18px 0px 18px",
};
const style = {
  padding: "8px 60px",
  color: "#fff",
  marginTop: "20px",
};
export default ExploreProduct;
