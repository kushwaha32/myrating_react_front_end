// third party module import
import Accordion from "react-bootstrap/Accordion";

// user define module import
import ProfileIdentity from "../ProfileIdentity";
import taj from "../../img/taj.jpg";
import scoreImg from "../../img/scoreStar.png";
import iImg from "../../img/iImg.png";

const UserFavoritesBelow767 = () => {
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
      <section className="user-main-sm767 user-main-sm767-b user-favourite-sm">
        <Accordion defaultActiveKey="attraction">
          <Accordion.Item eventKey="attraction">
            <Accordion.Header>Attractions</Accordion.Header>
            <Accordion.Body>
              <div className="user-attraction-sm">
                <ProfileIdentity
                  profileImg={taj}
                  name="Bandhul Bharti"
                  location="New Delhi, Delhi"
                />
              </div>
              <div className="user-attraction-sm">
                <ProfileIdentity
                  profileImg={taj}
                  name="Bandhul Bharti"
                  location="New Delhi, Delhi"
                />
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="hotels">
            <Accordion.Header>Hotels</Accordion.Header>
            <Accordion.Body>
              <div className="user-attraction-sm">
                <ProfileIdentity
                  profileImg={taj}
                  name="Bandhul Bharti"
                  location="New Delhi, Delhi"
                />
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </section>
    </>
  );
};

export default UserFavoritesBelow767;
