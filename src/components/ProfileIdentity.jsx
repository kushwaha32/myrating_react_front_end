import ImgWithSideCaption from "./ImgWithSideCaption";

const ProfileIdentity = ({
  profileImg,
  name,
  profession,
  location,
  scoreWalletImg,
  iImg,
  score,
}) => {
  return (
    <section className="user-main-sm767">
      <ImgWithSideCaption img={profileImg} title={name}>
        <span className="user-menu-a">{profession && profession}</span>
        <span className="user-menu-a">{location && location}</span>

        {scoreWalletImg && (
          <p className="user-menu-b">
            <img className="user-menu-ba" src={scoreWalletImg} alt="" />{" "}
            <span className="user-menu-bb">
              {score} <span>score</span>
            </span>
            <img className="user-menu-bc" src={iImg} alt="" />
          </p>
        )}
      </ImgWithSideCaption>
    </section>
  );
};

export default ProfileIdentity;
