import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import download from "../../img/downloading.png";

const UserFooterWithProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userLogout, { isLoading }] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      const res = await userLogout().unwrap();
      console.log(res);
      if (res.status === "success") {
        toast.success(res.message);

        // remove the user data
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {}
  };
  return (
    <>
      <div className="text-center">
        <nav className="footer-with-nav">
           <Link to="#">About Us</Link>
           <Link to="#">FAQs</Link>
           <Link to="#">Terms and Conditions</Link>
           <Link to="#">Privacy Policy</Link>
        </nav>
        <button
          className="profile-overview-b-cc profile-overview-b-cd"
          style={style}
          onClick={handleLogout}
        >
          {isLoading ? "...loading" : "Logout"}
        </button>
      </div>
    </>
  );
};

const style = {
  marginBottom: "5px"
}
export default UserFooterWithProfile;
