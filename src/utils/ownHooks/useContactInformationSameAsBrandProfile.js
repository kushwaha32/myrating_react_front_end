const useContactInformationSameAsBrandProfile = (setFieldValue) => {
  const sameAsBrandProfile = (conBrandPro) => {
    //////////////////////////////////////////////////////////
    /////////////--- Filter the landline data ---////////////
    ////////////////////////////////////////////////////////
    const landLineNo = JSON.parse(conBrandPro?.landLine)?.map(
      (curEl) => curEl?.landLineNo
    );

    const landLinePublic = JSON.parse(conBrandPro?.landLine)?.map(
      (curEl) => !curEl?.landLinePublic
    );
    const landlineCode = JSON.parse(conBrandPro?.landLine)?.map(
      (curEl) => curEl?.code
    );
    setFieldValue("landLineNo", landLineNo || [""]);
    setFieldValue("landLinePublic", landLinePublic || [true]);
    setFieldValue("landlineCode", landlineCode || [""]);

    //////////////////////////////////////////////////////////
    /////////////--- Filter the mobile data ---//////////////
    ////////////////////////////////////////////////////////
    const mobileNo = JSON.parse(conBrandPro?.mobileNo)?.map(
      (currMob) => currMob?.mobileNo
    );
    const isMobilePub = JSON.parse(conBrandPro?.mobileNo)?.map(
      (currMob) => !currMob?.isMobileNoPublic
    );
    setFieldValue("mobileNo", mobileNo || [""]);
    setFieldValue("isMobileNoPublic", isMobilePub || [true]);

    //////////////////////////////////////////////////////////
    ////////////--- Filter the tollfree data ---/////////////
    ////////////////////////////////////////////////////////
    const tollFreeNo = JSON.parse(conBrandPro?.tollFreeNo)?.map(
      (curToll) => curToll?.tollFreeNo
    );
    const isTollFreeNoPublic = JSON.parse(conBrandPro?.tollFreeNo)?.map(
      (curToll) => !curToll?.isTollFreeNoPublic
    );
    setFieldValue("tollFreeNo", tollFreeNo || [""]);
    setFieldValue("isTollFreeNoPublic", isTollFreeNoPublic || [true]);

    //////////////////////////////////////////////////////////
    //////////////--- Filter the email data ---//////////////
    ////////////////////////////////////////////////////////
    const emailId = JSON.parse(conBrandPro?.emailId)?.map(
      (currEmail) => currEmail?.emailId
    );
    const isEmailIdPublic = JSON.parse(conBrandPro?.emailId)?.map(
      (currEmail) => !currEmail?.isEmailIdPublic
    );
    setFieldValue("emailId", emailId || [""]);
    setFieldValue("isEmailIdPublic", isEmailIdPublic || [true]);

    //////////////////////////////////////////////////////////
    ////////////--- Filter the website data ---//////////////
    ////////////////////////////////////////////////////////
    const website = JSON.parse(conBrandPro?.websites)?.map(
      (currWeb) => currWeb?.websites
    );
    const isWebsitesPublic = JSON.parse(conBrandPro?.websites)?.map(
      (currWeb) => !currWeb?.isWbsitesPublic
    );
    setFieldValue("websites", website || [""]);
    setFieldValue("isWbsitesPublic", isWebsitesPublic || [true]);

    //////////////////////////////////////////////////////////
    ////////////--- Filter the youtube data ---//////////////
    ////////////////////////////////////////////////////////
    const youTube = JSON.parse(conBrandPro?.youtube)?.youTube;

    const isYouTubePublic = !JSON.parse(conBrandPro?.youtube)?.isYouTubePublic;

    setFieldValue("youTube", youTube || "");
    setFieldValue("isYouTubePublic", isYouTubePublic ?? true);

    //////////////////////////////////////////////////////////
    ////////////--- Filter the facebook data ---/////////////
    ////////////////////////////////////////////////////////
    const facebook = JSON.parse(conBrandPro?.facebook)?.facebook;

    const isFacebookPublic = !JSON.parse(conBrandPro?.facebook)
      ?.isFacebookPublic;

    setFieldValue("facebook", facebook || "");
    setFieldValue("isFacebookPublic", isFacebookPublic ?? true);

    //////////////////////////////////////////////////////////
    ////////////--- Filter the twitter data ---//////////////
    ////////////////////////////////////////////////////////
    const twitter = JSON.parse(conBrandPro?.twitter)?.twitter;
    const isTwitterPublic = !JSON.parse(conBrandPro?.twitter)?.isTwitterPublic;
    setFieldValue("twitter", twitter || "");
    setFieldValue("isTwitterPublic", isTwitterPublic ?? true);

    //////////////////////////////////////////////////////////
    ////////////--- Filter the instagram data ---////////////
    ////////////////////////////////////////////////////////
    const instagram = JSON.parse(conBrandPro?.instagram)?.instagram;
    const isInstagramPublic = !JSON.parse(conBrandPro?.instagram)
      ?.isInstagramPublic;
    setFieldValue("instagram", instagram || "");
    setFieldValue("isInstagramPublic", isInstagramPublic ?? true);
  };

  const diffFromBrandProfile = (conBrandPro) => {
    //////////////////////////////////////////////////////////
    /////////////--- Filter the landline data ---////////////
    ////////////////////////////////////////////////////////
    const landLineNo = conBrandPro?.landLine?.map((curEl) => curEl?.landLineNo);

    const landLinePublic = conBrandPro?.landLine?.map(
      (curEl) => !curEl?.landLinePublic
    );
    const landlineCode = conBrandPro?.landLine?.map((curEl) => curEl?.code);
    setFieldValue("landLineNo", landLineNo || [""]);
    setFieldValue("landLinePublic", landLinePublic || [true]);
    setFieldValue("landlineCode", landlineCode || [""]);

    //////////////////////////////////////////////////////////
    /////////////--- Filter the mobile data ---//////////////
    ////////////////////////////////////////////////////////
    const mobileNo = conBrandPro?.mobileNo?.map((currMob) => currMob?.mobileNo);
    const isMobilePub = conBrandPro?.mobileNo?.map(
      (currMob) => !currMob?.isMobileNoPublic
    );
    setFieldValue("mobileNo", mobileNo || [""]);
    setFieldValue("isMobileNoPublic", isMobilePub || [true]);

    //////////////////////////////////////////////////////////
    ////////////--- Filter the tollfree data ---/////////////
    ////////////////////////////////////////////////////////
    const tollFreeNo = conBrandPro?.tollFreeNo?.map(
      (curToll) => curToll?.tollFreeNo
    );
    const isTollFreeNoPublic = conBrandPro?.tollFreeNo?.map(
      (curToll) => !curToll?.isTollFreeNoPublic
    );
    setFieldValue("tollFreeNo", tollFreeNo || [""]);
    setFieldValue("isTollFreeNoPublic", isTollFreeNoPublic || [true]);

    //////////////////////////////////////////////////////////
    //////////////--- Filter the email data ---//////////////
    ////////////////////////////////////////////////////////
    const emailId = conBrandPro?.emailId?.map(
      (currEmail) => currEmail?.emailId
    );
    const isEmailIdPublic = conBrandPro?.emailId?.map(
      (currEmail) => !currEmail?.isEmailIdPublic
    );
    setFieldValue("emailId", emailId || [""]);
    setFieldValue("isEmailIdPublic", isEmailIdPublic || [true]);

    //////////////////////////////////////////////////////////
    ////////////--- Filter the website data ---//////////////
    ////////////////////////////////////////////////////////
    const website = conBrandPro?.websites?.map((currWeb) => currWeb?.websites);
    const isWebsitesPublic = conBrandPro?.websites?.map(
      (currWeb) => !currWeb?.isWbsitesPublic
    );
    setFieldValue("websites", website || [""]);
    setFieldValue("isWbsitesPublic", isWebsitesPublic || [true]);

    //////////////////////////////////////////////////////////
    ////////////--- Filter the youtube data ---//////////////
    ////////////////////////////////////////////////////////
    const youTube = conBrandPro?.youtube?.youTube;

    const isYouTubePublic = !conBrandPro?.youtube?.isYouTubePublic;

    setFieldValue("youTube", youTube || "");
    setFieldValue("isYouTubePublic", isYouTubePublic ?? true);

    //////////////////////////////////////////////////////////
    ////////////--- Filter the facebook data ---/////////////
    ////////////////////////////////////////////////////////
    const facebook = conBrandPro?.facebook?.facebook;

    const isFacebookPublic = !conBrandPro?.facebook?.isFacebookPublic;

    setFieldValue("facebook", facebook || "");
    setFieldValue("isFacebookPublic", isFacebookPublic ?? true);

    //////////////////////////////////////////////////////////
    ////////////--- Filter the twitter data ---//////////////
    ////////////////////////////////////////////////////////
    const twitter = conBrandPro?.twitter?.twitter;
    const isTwitterPublic = !conBrandPro?.twitter?.isTwitterPublic;
    setFieldValue("twitter", twitter || "");
    setFieldValue("isTwitterPublic", isTwitterPublic ?? true);

    //////////////////////////////////////////////////////////
    ////////////--- Filter the instagram data ---////////////
    ////////////////////////////////////////////////////////
    const instagram = conBrandPro?.instagram?.instagram;
    const isInstagramPublic = !conBrandPro?.instagram?.isInstagramPublic;
    setFieldValue("instagram", instagram || "");
    setFieldValue("isInstagramPublic", isInstagramPublic ?? true);
  };
  return [sameAsBrandProfile, diffFromBrandProfile];
};

export default useContactInformationSameAsBrandProfile;
