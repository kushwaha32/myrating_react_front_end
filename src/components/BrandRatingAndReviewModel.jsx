import ReactStars from "react-rating-stars-component";
import "../assets/css/ratingAndReviewModel.css";
import { useRef, useState } from "react";
import RatingAs from "./RatingAs";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { ratingAndReviewSchema } from "../schemaValidation/ratingAndReviewValidation";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import useGetImageSecureUrl from "../utils/ownHooks/useGetImageScureUrl";
import { useCreateBrandRatingMutation } from "../slices/brandRatingApiSlice";
import { setBrandRatings } from "../slices/brandRatingSlice";
import useBrandAvgRatingWithSocket from "../utils/ownHooks/useBrandAvgRatingWithSocket";
import useBrandRatingDistributionWithSocket from "../utils/ownHooks/useBrandDistributedRatingWithSocket";

const initialValues = {
  // rateAs: "visitor",
  review: "",
  rating: "",
  product: "",
  reviewImg: [],
};

const BrandRatingAndReview = ({ location }) => {
  const [createRating, { isLoading }] = useCreateBrandRatingMutation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const reviewImgRef = useRef(null);

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// --- update the average Rating  ----- ////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  const handleAvgRating = useBrandAvgRatingWithSocket(location[2]);

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// --- update the Rating distribution  ----- ////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  const handleRatingDistribution = useBrandRatingDistributionWithSocket(
    location[2]
  );

  /////////////////////////////////////////////////////////////////////////////////////
  /////--- Handle and upload image to s3 bucket in update to user profile ---/////////
  ///////////////////////////////////////////////////////////////////////////////////
  const handleSecureUrl = useGetImageSecureUrl();

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
    resetForm,
    setErrors,
  } = useFormik({
    initialValues,
    validationSchema: ratingAndReviewSchema,
    onSubmit: async (value) => {
      try {
        setLoading(true);
        let reviewImgUrl;
        if (value.reviewImg.length > 0) {
          reviewImgUrl = await Promise.all(
            value.reviewImg.map(async (img) => {
              let newImg = await handleSecureUrl(img);
              return newImg;
            })
          );
        }

        const data = {
          ...value,
          reviewImg: reviewImgUrl,
          brandProfile: location[2],
        };

        // parallel api call
        const res = await createRating(data).unwrap();
        if (res.status === "success") {
          // reset the form field
          resetForm();
          console.log(res?.data?.review);
          dispatch(setBrandRatings(res?.data?.review));
          handleAvgRating();
          handleRatingDistribution();
          toast.success("Thanks for Review.");
          setLoading(false);
        } else {
          toast.error(res.message);
          setLoading(false);
        }
      } catch (err) {
        toast.error(err.message);
        setLoading(false);
      }
    },
  });

  /////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////---- handling the review images image change -----///////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  const handleReviewImg = () => {
    reviewImgRef.current.click();
  };
  /////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////---- Remove attachments images -----//////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  const removeAttachment = (index) => {
    const cloneReviewImg = [...values.reviewImg];
    cloneReviewImg.splice(index, 1);
    setFieldValue("reviewImg", cloneReviewImg);
  };
  return (
    <div className="rr-model">
      <div className="rr-model-c">
        <form onSubmit={handleSubmit}>
          {/* //////////////////////////////////////////////// */}
          {/* /////////////------ give Rating -----/////////// */}
          {/* //////////////////////////////////////////////// */}
          <RatingAs title="Give Ratings" cls="active-rating mt-0">
            <ReactStars
              count={5}
              onChange={(rating) => setFieldValue("rating", rating)}
              size={30}
              style={{ marginRight: "30px" }}
              isHalf={false}
              activeColor="#02ca19"
            />
          </RatingAs>
          {errors.rating && touched.rating ? (
            <div className="field-eror">{errors.rating}</div>
          ) : null}
          {/* //////////////////////////////////////////////// */}
          {/* ///////////////------ Review -----////////////// */}
          {/* //////////////////////////////////////////////// */}
          <div className="form-group mt-3">
            <div className="row">
              {/* ////////////////////////////////////////////////////// */}
              {/* ///////////////------ Review input -----////////////// */}
              {/* ////////////////////////////////////////////////////// */}

              <div className="col-lg-8 col-md-8 col-sm-8 col-12">
                <textarea
                  className="form-control review-box-pro"
                  rows={5}
                  name="review"
                  id="comment"
                  defaultValue={""}
                  placeholder="Write Review"
                  onChange={handleChange}
                  style={{ height: "85px" }}
                />
                {errors.review && touched.review ? (
                  <div className="field-eror">{errors.review}</div>
                ) : null}
              </div>
              {/* //////////////////////////////////////////////////////////// */}
              {/* ////////////------ Review attachment images -----/////////// */}
              {/* //////////////////////////////////////////////////////////// */}
              <div className="col-lg-4 col-md-4 col-sm-4 col-12 position-relative">
                <div className="add-review-img text-center">
                  <button
                    type="button"
                    className="btn btn-white review-img-btn"
                    onClick={handleReviewImg}
                  >
                    <input
                      type="file"
                      ref={reviewImgRef}
                      multiple={true}
                      style={{ display: "none" }}
                      name="reviewImg"
                      onChange={(e) =>
                        e.target.files.length > 5
                          ? alert("Maximum 5 attachments are allowed!")
                          : setFieldValue("reviewImg", [
                              ...Array.from(e.target.files),
                              ...values?.reviewImg,
                            ])
                      }
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="30"
                      viewBox="0 0 30 30"
                    >
                      <path
                        id="Icon_material-add-to-photos"
                        data-name="Icon material-add-to-photos"
                        d="M6,9H3V30a3.009,3.009,0,0,0,3,3H27V30H6ZM30,3H12A3.009,3.009,0,0,0,9,6V24a3.009,3.009,0,0,0,3,3H30a3.009,3.009,0,0,0,3-3V6A3.009,3.009,0,0,0,30,3ZM28.5,16.5h-6v6h-3v-6h-6v-3h6v-6h3v6h6Z"
                        transform="translate(-3 -3)"
                      />
                    </svg>
                  </button>
                </div>
                <div className="text-center">
                  <button
                    className={`btn btn-form ${isLoading && "disabled"}`}
                    type="submit"
                    style={buttonStyle}
                  >
                    {loading ? (
                      <PulseLoader
                        color="rgb(219, 237, 255)"
                        loading={loading}
                        size={6}
                        cssOverride={{
                          width: "37px",
                        }}
                      />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
              <div className="col-lg-8">
                {values?.reviewImg.length ? (
                  <div className="review-images">
                    <>
                      {" "}
                      {values?.reviewImg?.map((img, index) => (
                        <span key={index}>
                          <i
                            className="fa fa-trash"
                            onClick={() => removeAttachment(index)}
                          ></i>
                          <img src={URL.createObjectURL(img)} alt="" />
                        </span>
                      ))}
                    </>
                  </div>
                ) : (
                  ""
                )}
                {errors.reviewImg && touched.reviewImg ? (
                  <div className="field-eror">{errors.reviewImg}</div>
                ) : null}{" "}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const buttonStyle = {
  fontSize: "14px",
  borderRadius: "10px",
  width: "135px",
  padding: "6px 0px",
  marginTop: "12px",
  marginBottom: "18px",
  color: "rgb(219, 237, 255)",
  borderTopLeftRadius: "30px",
  borderBottomLeftRadius: "30px",
  borderTopRightRadius: "30px",
  borderBottomRightRadius: "30px",
};

export default BrandRatingAndReview;
