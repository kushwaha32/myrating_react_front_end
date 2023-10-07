import { useDispatch, useSelector } from "react-redux";
import { toast, useToast } from "react-toastify";
import "../../assets/css/productProfile.css";
import ImgWithSideCaption from "../ImgWithSideCaption";
import profilePick from "../../img/profile-pick.jpg";
import noImage from "../../img/img.png";
import plus from "../../img/plus.png";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import locationImg from "../../img/location.png";
import "draft-js/dist/Draft.css";
import ProductEditor from "./Editor";
import {
  useGetProductBasedSlugMutation,
  useUpdateProductMutation,
} from "../../slices/productsApiSlice";
import { updateProducts } from "../../slices/productSlice";
import { useLocation } from "react-router-dom";
import { baseImageUrl } from "../../utils/baseUrl";
import { updateProductSchema } from "../../schemaValidation/updateProductValication";
import GoogleAutoComplete from "../googleLocationAutoComplete";
import { useGetS3SecureUrlMutation } from "../../slices/s3bucketApiSlice";
import axios from "axios";

const initialValues = {
  profileName: "",
  profileCategory: "",
  googleLocation: "",
  image: "",
  id: "",
};

const UpdateProductProfile = () => {
  const [editorData, setEditorData] = useState("");
  const [profileImg, setProfileImg] = useState();
  const [loading, setLoading] = useState(false);
  const location = useLocation().pathname.split("/");

  const [getProductBasedOnSlug, { isLoading: isProductLoading }] =
    useGetProductBasedSlugMutation();

  // get secure url s3 bucket mutation
  const [getSecureUrl, { isLoading: secureUrlLoading }] =
    useGetS3SecureUrlMutation();

  useEffect(() => {
    getUpdateInfo();
  }, []);

  const getUpdateInfo = async () => {
    try {
      const res = await getProductBasedOnSlug({
        productSlug: location[4],
      }).unwrap();

      if (res?.status === "success") {
        console.log(res);
        setFieldValue("profileName", res?.data?.product?.productName);
        setFieldValue("profileCategory", res?.data?.product?.subCategory?._id);
        setFieldValue(
          "googleLocation",
          JSON.stringify(res?.data?.product?.location)
        );
        setFieldValue("id", res?.data?.product?._id);
        setProfileImg(`${res?.data?.product?.proifleImg}`);
        setEditorData(res?.data?.product?.bio || "");
      }
    } catch (error) {}
  };

  // get the mutation
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const dispatch = useDispatch();

  // get the BrandInfo
  const { userInfo } = useSelector((state) => state.auth);

  //  profile background image
  const profileBgImg = (img) => {
    return {
      backgroundImage: `url(${img ? img : noImage})`,
    };
  };

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: updateProductSchema,
    onSubmit: async (value) => {
      try {
        setLoading(true);

        const data = {
          productName: value.profileName,
          category: value.profileCategory,
          location: value.googleLocation,
          bio: editorData,
          id: value.id,
        };

        if (value.image) {
          // check if image is selected

          const resUrl = await getSecureUrl().unwrap();
          if (resUrl.status === "success") {
            const secureUrl = resUrl.uploadUrl;

            // make request to store img to the s3bucket
            await axios(secureUrl, {
              method: "PUT",
              headers: {
                "Content-Type": "multipart/form-data",
              },
              data: value.image, // Use the "data" key to send the request body
            });

            const imgUrl = secureUrl.split("?")[0];

            data.image = imgUrl;
          }
        }

        const res = await updateProduct(data).unwrap();

        if (res.status === "success") {
          // set the product into localstorage
          dispatch(updateProducts(res.data.products));
          toast.success(res.message);
          setLoading(false);
        } else {
          toast.error(res.message);
          setLoading(false);
        }
      } catch (error) {
        toast.error(errors.message);
        setLoading(false);
      }
    },
  });

  //   handle profile background image
  const handleImage = (e) => {
    setFieldValue("image", e.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      setProfileImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleLocationSelect = (geoLocation) => {
    // Use the selected location in your parent component logic
    setFieldValue("googleLocation", JSON.stringify(geoLocation));
  };
  return (
    <section className="product-profile">
      <h2 className="product-profile-h">Update Product</h2>
      <form onSubmit={handleSubmit} className="product-profile-a">
        <section className="product-profile-ab business">
          <ImgWithSideCaption
            img={userInfo?.user?.brandProfile?.brandImage || "man.png"}
            title={userInfo?.user?.brandProfile?.brandName}
          />

          <div
            className="product-profile-ab-a"
            style={profileBgImg(profileImg)}
          ></div>
          {/* error handling of image */}
          {errors.image && touched.image ? (
            <div className="field-eror">{errors.image}</div>
          ) : null}

          <figure className="product-profile-ab-b text-center">
            <span className="addProfile product-profile-ab-ba">
              <input type="file" name="image" onChange={handleImage} />
              Add Photo
            </span>
            <img src={plus} className="plus" alt="plus" />
          </figure>
        </section>
        <section className="product-profile-ac">
          {/* profile name */}
          <div className="form-group">
            <label htmlFor="profileName">Profile Name</label>
            <input
              type="text"
              className={`form-control ${
                errors.profileName && touched.profileName ? "is-invalid" : ""
              }`}
              id="profileName"
              value={values.profileName}
              name="profileName"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {/* error handling of image */}
          {errors.profileName && touched.profileName ? (
            <div className="field-eror">{errors.profileName}</div>
          ) : null}
          {/* profile category */}
          <div className="form-group mt-4">
            <label htmlFor="profileCategory">Profile Category </label>
            <select
              name="profileCategory"
              className={`form-select select-profession text-capitalize ${
                errors.profileCategory && touched.profileCategory
                  ? "is-invalid"
                  : ""
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.profileCategory}
              id="profileCategory"
            >
              <option value="">select</option>
              {userInfo?.user?.brandProfile?.industry?.subCategory?.map(
                (currCat) => (
                  <option value={currCat?._id}>{currCat?.name}</option>
                )
              )}
            </select>
          </div>
          {errors.profileCategory && touched.profileCategory ? (
            <div className="field-eror">{errors.profileCategory}</div>
          ) : null}

          {/* Business current location */}
          <GoogleAutoComplete
            handleLocationSelect={handleLocationSelect}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
          />

          {/* editor */}
          <div className="form-group loc-profile mt-4">
            <label htmlFor="">Bio</label>
            <ProductEditor
              setEditorData={setEditorData}
              editorData={editorData}
            />
          </div>
          <div className="mt-3 text-center">
            <button
              className={`btn btn-form ${loading && "disabled"}`}
              type="submit"
              style={buttonStyle}
            >
              {loading ? "...loading" : "Submit"}
            </button>
          </div>
        </section>
      </form>
    </section>
  );
};

const buttonStyle = {
  fontSize: "17px",
  borderRadius: "10px",
  width: "270px",
  padding: "8px 0",
  fontWeight: "bold",
};

export default UpdateProductProfile;
