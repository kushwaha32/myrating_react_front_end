import { useSelector } from "react-redux";

const UserResourceCommonContainer = ({
  children,
  edit,
  handalModalShow,
  title,
}) => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="user-about">
      <div className="user-about-a">
        <div className="user-about-aa">
          <h4 className="user-about-aaa color-yellow-dark">{title}</h4>
          {edit ? (
            <button
              className="user-about-aab color-yellow-dark"
              onClick={handalModalShow}
            >
              {userInfo?.user?.role === "user" ? (
                <>{userInfo?.user?.userProfile ? "Edit" : "Create Profile"}</>
              ) : (
                <>Edit</>
              )}
            </button>
          ) : (
            ""
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default UserResourceCommonContainer;
