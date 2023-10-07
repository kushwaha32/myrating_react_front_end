import likeImg from "../img/likes.png";
import dislikeImg from "../img/dislike.png";
import likeActive from "../img/likes-active.png";
import dislikeActive from "../img/dislike-active.png";
import {
  useCreateAgreeMutation,
  useCreateDisAgreeMutation,
  useGetReviewAgreeMutation,
  useGetReviewDisAgreeMutation,
} from "../slices/reviewAgreeAndDisAgreeApiSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ReviewAgreeAndDisagree = ({ rating }) => {
  const [reviewAgree, setReviewAgree] = useState([]);
  const [reviewDisAgree, setReviewDisAgree] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  // get review agree mutation
  const [getReviewAgree, { isLoading: reviewAgreeLoading }] =
    useGetReviewAgreeMutation();
  // get review dis agree mutation
  const [getReviewDisAgree, { isLoading: reviewDisAgreeLoading }] =
    useGetReviewDisAgreeMutation();

  // create agree of review
  const [createAgree, { isLoading: isCreateAgree }] = useCreateAgreeMutation();

  // create disagree of review
  const [createDisAgree, { isLoading: isDisAgree }] =
    useCreateDisAgreeMutation();

  useEffect(() => {
    handleReviewAgree();
    handleReviewDisAgree();
  }, []);

  const handleReviewAgree = async () => {
    try {
      const res = await getReviewAgree({ reviewId: rating?._id }).unwrap();
      if (res.status === "success") {
        setReviewAgree(res?.data?.reviewAgree);
      }
    } catch (error) {}
  };
  const handleReviewDisAgree = async () => {
    try {
      const res = await getReviewDisAgree({ reviewId: rating?._id }).unwrap();
      if (res.status === "success") {
        setReviewDisAgree(res?.data?.reviewDisAgree);
      }
    } catch (error) {}
  };
  // handle agree
  const handleAgree = async (e, review, type) => {
    try {
      let res;
      if (type === "agree") {
        res = await createAgree({ review }).unwrap();
      }

      if (type === "disAgree") {
        res = await createDisAgree({ review }).unwrap();
      }
      if (res.status === "success") {
        handleReviewAgree();
        handleReviewDisAgree();
      }
    } catch (err) {}
  };
  return (
    <ul>
      <li>
        <img
          src={
            reviewAgree.find((currEl) => currEl?.user === userInfo?.user?._id)
              ? likeActive
              : likeImg
          }
          alt=""
          onClick={(e) => handleAgree(e, rating?._id, "agree")}
          style={{ cursor: "pointer" }}
        />
        <span
          onClick={(e) => handleAgree(e, rating?._id, "agree")}
          style={{ cursor: "pointer" }}
        >
          {/* {rating?.nAgree} agree */}
          {reviewAgree?.length} agree
        </span>
      </li>
      <li>
        <img
          src={
            reviewDisAgree.find((currEl) => currEl.user === userInfo?.user?._id)
              ? dislikeActive
              : dislikeImg
          }
          alt=""
          onClick={(e) => handleAgree(e, rating?._id, "disAgree")}
          style={{ cursor: "pointer" }}
        />
        <span
          onClick={(e) => handleAgree(e, rating?._id, "disAgree")}
          style={{ cursor: "pointer" }}
        >
          {/* {rating?.nDisAgree} disagree */}
          {reviewDisAgree?.length} disagree
        </span>
      </li>
    </ul>
  );
};

export default ReviewAgreeAndDisagree;
