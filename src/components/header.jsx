// core Module imports
import { useState } from "react";
// developer Imports
import ModalAuth from "./modalAuth";
import HeaderSuper from "./header/headerSuper";
import HeaderLeftSection from "./header/headerLeftSection";
import HeaderRightSection from "./header/headerRightSection";
import BusinessRegistrationModel from "./BusinessRegistrationModel";
import LoginModal from "./LoginModel";

const Header = ({ handleUserSideNav }) => {
  // auth dropdown state on small screen
  const [toggle, setToggle] = useState(true);

  // dropdown small screen manage toggle
  const manageToggle = () => setToggle(!toggle);

  // business registration model state
  const [showBusinessRegistrationModel, setShowBusinessRegistrationModel] =
    useState(false);
  const businessRegistrationModelClose = () =>
    setShowBusinessRegistrationModel(false);
  const businessRegistrationModelShow = () =>
    setShowBusinessRegistrationModel(true);

  //user registration modal state
  const [showUserRegistrationModel, setShowUserRegistrationModel] =
    useState(false);
  const userRegistrationModelClose = () => setShowUserRegistrationModel(false);
  const userRegistrationModelShow = () => setShowUserRegistrationModel(true);

  // Login Model
  const [loginModel, setLoginModel] = useState(false);
  const loginModelClose = () => setLoginModel(false);
  const loginModelShow = () => setLoginModel(true);

  return (
    <HeaderSuper>
      <HeaderLeftSection />
      <HeaderRightSection
        toggle={toggle}
        userRegistrationModelShow={userRegistrationModelShow}
        businessRegistrationModelShow={businessRegistrationModelShow}
        loginModelShow={loginModelShow}
        manageToggle={manageToggle}
        handleUserSideNav={handleUserSideNav}
      />

      {/* Login Modal */}
      <LoginModal
        loginModelClose={loginModelClose}
        loginModelShow={loginModelShow}
        loginModel={loginModel}
      />
    </HeaderSuper>
  );
};

export default Header;
