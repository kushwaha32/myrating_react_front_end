import { useEffect, useState } from "react";
import UserSettingAccountContainer from "./UserSettingAccoutContainer";
import "../assets/css/userPrivacy.css";
import { useSelector } from "react-redux";
import UserPrivacyToggledSwitch from "./UserPrivacyToggleSwitch";
import { useFormik } from "formik";
import UserPrivacyConditionWithSwith from "./UserPrivacyConditionWithSwitch";
import { PulseLoader } from "react-spinners";
import {
  useGetUserProfileMutation,
  useUpdateUserProfilePrivacyMutation,
} from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const initialValues = {
  proPrivacy: true,
  reviewAndVisibility: true,
  agreeAndDisAgreeOnReview: true,
  newOffers: true,
  plateFormUpdateAnnounce: true,
  allowToSearchMyAccount: true,
  shareLocationToNearProfile: true,
  allowPersonalizeAdds: true,
  nonPersonalizedAdd: true,
  preferences: "",
};

const UserPrivacy = () => {
  //////////////////////////////////////////////////////////////////
  //////--- Get User Info from the state ---////////////////////////
  /////////////////////////////////////////////////////////////////
  const { userInfo } = useSelector((state) => state.auth);

  const [userSlug, setUserSlug] = useState(userInfo?.user?._id);
  const slugUrl = `/business/${userSlug}/setting`;
  const [isLoading, setIsLoading] = useState(false);

  //////////////////////////////////////////////////////////////////
  //////--- Get update user profile Privacy mutation  ---///////////
  /////////////////////////////////////////////////////////////////
  const [updateUserProfilePrivacy] = useUpdateUserProfilePrivacyMutation();

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      onSubmit: async (value) => {
        try {
          setIsLoading(true);
          value.id = userInfo?.user?.userProfile?._id;
          const res = await updateUserProfilePrivacy(value).unwrap();
          if (res.status === "success") {
            setIsLoading(false);
            toast.success("Your Privacy Updated Successfully!");
          }
        } catch (error) {
          setIsLoading(false);
          console.log(error.message);
        }
      },
    });

  //////////////////////////////////////////////////////////////////
  ////////////////--- Get user profile Mutation ---////////////////
  ////////////////////////////////////////////////////////////////
  const [getUserProfile] = useGetUserProfileMutation();

  //////////////////////////////////////////////////////////////////
  //////////--- Set Field values as component load ---/////////////
  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    handleGetUserProfile();
  }, []);

  //////////////////////////////////////////////////////////////////
  ////////////////--------- Get User profile --------//////////////
  ////////////////////////////////////////////////////////////////
  const handleGetUserProfile = async () => {
    try {
      const res = await getUserProfile().unwrap();
      console.log(res);
      if (res?.status === "success") {
        const {
          proPrivacy,
          reviewAndVisibility,
          agreeAndDisAgreeOnReview,
          newOffers,
          plateFormUpdateAnnounce,
          allowToSearchMyAccount,
          shareLocationToNearProfile,
          allowPersonalizeAdds,
          nonPersonalizedAdd,
          preferences,
        } = res?.data;
        setFieldValue("proPrivacy", proPrivacy);
        setFieldValue("reviewAndVisibility", reviewAndVisibility);
        setFieldValue("agreeAndDisAgreeOnReview", agreeAndDisAgreeOnReview);
        setFieldValue("newOffers", newOffers);
        setFieldValue("plateFormUpdateAnnounce", plateFormUpdateAnnounce);
        setFieldValue("allowToSearchMyAccount", allowToSearchMyAccount);
        setFieldValue("shareLocationToNearProfile", shareLocationToNearProfile);
        setFieldValue("allowPersonalizeAdds", allowPersonalizeAdds);
        setFieldValue("nonPersonalizedAdd", nonPersonalizedAdd);
        setFieldValue("preferences", preferences);
      }
    } catch (error) {}
  };
  return (
    <div className="user-privacy">
      <UserSettingAccountContainer slugUrl={slugUrl} title="My Privacy">
        <form onSubmit={handleSubmit} className="user-privacy-main">
          {/* ///////////////////////////////////////////////////////// */}
          {/* ///////////---- Profile Privacy ------///////// */}
          {/* ///////////////////////////////////////////////////////// */}
          <h1>Profile Privacy</h1>
          <UserPrivacyConditionWithSwith
            conditionTitle="Allow others to see my profile information (except Login Mobile
              No. & Date of Birth)"
            conditionName="proPrivacy"
            value={values.proPrivacy}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />

          {/* ///////////////////////////////////////////////////////// */}
          {/* ///////////---- Ratings & Review Visibility ------///////// */}
          {/* ///////////////////////////////////////////////////////// */}
          <h1>Ratings & Review Visibility</h1>
          <UserPrivacyConditionWithSwith
            conditionTitle="Make my reviews and ratings public"
            conditionName="reviewAndVisibility"
            value={values.reviewAndVisibility}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />

          {/* ///////////////////////////////////////////////////////// */}
          {/* ///////////////////---- Notifications ------///////////// */}
          {/* ///////////////////////////////////////////////////////// */}
          <h1>Notifications</h1>
          <UserPrivacyConditionWithSwith
            conditionTitle="Agree and Disagree on my reviews"
            conditionName="agreeAndDisAgreeOnReview"
            value={values.agreeAndDisAgreeOnReview}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          <UserPrivacyConditionWithSwith
            conditionTitle="New offers"
            conditionName="newOffers"
            value={values.newOffers}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          <UserPrivacyConditionWithSwith
            conditionTitle="Platform updates and announcements"
            conditionName="plateFormUpdateAnnounce"
            value={values.plateFormUpdateAnnounce}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />

          {/* ///////////////////////////////////////////////////////// */}
          {/* ///////////---- Account Visibility ------///////// */}
          {/* ///////////////////////////////////////////////////////// */}
          <h1>Account Visibility</h1>
          <UserPrivacyConditionWithSwith
            conditionTitle="Allow others to search for and find my account"
            conditionName="allowToSearchMyAccount"
            value={values.allowToSearchMyAccount}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />

          {/* ///////////////////////////////////////////////////////// */}
          {/* ///////////---- Location Sharing ------///////// */}
          {/* ///////////////////////////////////////////////////////// */}
          <h1>Location Sharing</h1>
          <UserPrivacyConditionWithSwith
            conditionTitle="Share my location to get nearby Profiles (i.e. Hotels, Restaurants etc.)"
            conditionName="shareLocationToNearProfile"
            value={values.shareLocationToNearProfile}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />

          {/* ///////////////////////////////////////////////////////// */}
          {/* ///////////---- Ad Personalization ------///////// */}
          {/* ///////////////////////////////////////////////////////// */}
          <h1>Ad Personalization</h1>
          <UserPrivacyConditionWithSwith
            conditionTitle="Allow personalized ads based on my interests and activity"
            conditionName="allowPersonalizeAdds"
            value={values.allowPersonalizeAdds}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          <UserPrivacyConditionWithSwith
            conditionTitle="Show me non-personalize ads"
            conditionName="nonPersonalizedAdd"
            value={values.nonPersonalizedAdd}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />

          {/* ///////////////////////////////////////////////////////// */}
          {/* ////////////////---- My Preferences ------/////////////// */}
          {/* ///////////////////////////////////////////////////////// */}
          <h1>My Preferences</h1>
          <span className="d-block" style={{ color: "#8a8b88" }}>
            Select your interest and preferences
          </span>
          <textarea
            className="form-control mt-2 mb-5"
            name="preferences"
            placeholder="Type Keywords"
            value={values.preferences}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ height: "156px", width: "100%" }}
          ></textarea>

          {/* ///////////////////////////////////////////////////////// */}
          {/* ////////////////------ Save button ------//////////////// */}
          {/* ///////////////////////////////////////////////////////// */}
          <div className="btn-s-main mt-2 mb-5 row justify-content-center">
            <button
              type="submit"
              className={`btn btn-white ${isLoading && "disabled"} btn-sm-pri`}
              style={{ width: "215px" }}
            >
              {isLoading ? "Loading" : "Update"}
              <PulseLoader
                color="rgb(0 40 86 / 80%)"
                loading={isLoading}
                size={6}
                cssOverride={{ width: "37px", display: "inline" }}
              />
            </button>
          </div>
        </form>
      </UserSettingAccountContainer>
    </div>
  );
};

const style = {
  width: "160px",
  padding: "9px 0",
  color: "#fff",
};

export default UserPrivacy;
