import UserResourceCommonContainer from "./UserResourceCommonContainer";
import peaches from "../img/peachs-rewards.png";
import { useSelector } from "react-redux";

const UserWallet = () => {
   const {userInfo} = useSelector(state => state.auth);
    return(
        <div className="wallet">
            <UserResourceCommonContainer edit={false} title="E-Wallet" >
                 <figure className="wallet-a">
                    <img src={peaches} alt="" />
                    <figcaption className="wallet-aa">
                         <h3>Total Available Stars</h3>
                         <span>{userInfo?.user?.peaches}</span>
                    </figcaption>
                 </figure>
              
                 <dir className="wallet-b">
                    <span>Total Earned Rewards <span>{userInfo?.user?.peaches}</span></span>
                    <span>Total Spend Rewards <span>0</span></span>
                 </dir>
            </UserResourceCommonContainer>
         </div>
    )
}

export default UserWallet;