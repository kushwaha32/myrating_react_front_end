import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import download from "../../img/downloading.png";


const UserFooterWithoutProfile = ({ userRegistrationModelShow }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [ userLogout, { isLoading }] = useLogoutMutation();
    const handleLogout = async() => {
         try {
            const res = await userLogout().unwrap();
            console.log(res);
            if(res.status === "success"){
                toast.success(res.message);

                // remove the user data
                dispatch(logout())
                navigate("/");
            }
         } catch (error) {
            
         }
    }
    return(
        <>
         <h4 className="profile-overview-b-ca">
                Activate your Wallet
              </h4>
              <img
                src={download}
                className="profile-overview-b-cb"
                alt="active-account-below"
              />
              <div className="text-center">
                <button className="profile-overview-b-cc" onClick={userRegistrationModelShow}>
                  Complete your Profile
                </button>
                <button className="profile-overview-b-cc profile-overview-b-cd" onClick={handleLogout}>
                    { isLoading ? "...loading" : "Logout"}
                </button>
              </div>
        </>
    )
}

export default UserFooterWithoutProfile;