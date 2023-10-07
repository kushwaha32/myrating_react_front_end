// third party module import
import Accordion from "react-bootstrap/Accordion";

// user defined module import
import "../../assets/css/userbelow767.css";
import taj from "../../img/taj.jpg";
import scoreImg from "../../img/scoreStar.png";
import iImg from "../../img/iImg.png";
import geolocation from "../../img/ih-geoLocation.png";
import ButtonFormSubmit from "../buttonFormSubmit";
import ProfileIdentity from "../ProfileIdentity";

const UserAboutBelow767 = () => {
  return (
    <>
      <ProfileIdentity
        profileImg={taj}
        name="Bandhul Bharti"
        profession="Musician"
        location="New Delhi, Delhi"
        scoreWalletImg={scoreImg}
        iImg={iImg}
        score="100"
      />
      <section className="user-main-sm767 user-main-sm767-b">
        <Accordion defaultActiveKey="personalInfo">
          <Accordion.Item eventKey="personalInfo">
            <Accordion.Header>Personal Information</Accordion.Header>
            <Accordion.Body className="px-0">
              <div className="user-about-ab user-main-sm767-ba">
                <div className="user-about-aba">
                  {/* name */}
                  <div className="user-about-aba-left">
                    <label className="field" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="field-val"
                      placeholder="Bandhul Bharti"
                    />
                  </div>
                  {/* profession */}
                  <div className="user-about-aba-right mt-3">
                    <label className="field" htmlFor="profession">
                      Profession
                    </label>
                    <input
                      type="text"
                      id="profession"
                      className="field-val"
                      placeholder="Musician"
                    />
                  </div>
                </div>

                <div className="user-about-aba mt-3">
                  {/* city */}
                  <div className="user-about-aba-left ">
                    <label className="field" htmlFor="city">
                      City/Location
                    </label>
                    <div className="user-about-aba-left-a">
                      <input
                        type="text"
                        id="city"
                        className="field-val"
                        placeholder="Ghaziabad"
                      />
                      <img src={geolocation} alt="" />
                    </div>
                  </div>
                  {/* date of birth */}
                  <div className="user-about-aba-right mt-3">
                    <label className="field" htmlFor="dateOfBirth">
                      Date of Birth
                    </label>
                    <div className="user-about-aba-left-a">
                      <input
                        type="date"
                        id="dateOfBirth"
                        className="field-val"
                        placeholder="17/06/1992"
                        value="17/06/1992"
                      />
                      {/* <img src={calender} alt="" /> */}
                    </div>
                  </div>
                </div>

                <div className="user-about-aba mt-3">
                  {/* gender */}
                  <div className="user-about-aba-left">
                    <label className="field" htmlFor="gender">
                      Gender
                    </label>
                    <input
                      type="text"
                      id="gender"
                      className="field-val"
                      placeholder="Male"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <ButtonFormSubmit style={style} text="Update" />
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="contactInfo">
            <Accordion.Header>Contact Information</Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </section>
    </>
  );
};

const style = {
  width: "138px",
  height: "41px",
  marginTop: "20px"
};
export default UserAboutBelow767;
