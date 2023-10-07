import { useState } from "react";
import UserAndProductNavigationBtn from "../UserAndProductNavigationBtn";


const UserAccountSetting767 = () => {
    const [userSlug, setUserSlug] = useState(34);
    const slugUrl = `/user/${userSlug}/setting`;
    return(
        <div className="user-account-setting-sm">
            {/* My Account */}
        <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}/account`}
          slugUrlT={`${slugUrl}/account/`}
          title="My Account"
        />
       {/* My privacy */}
       <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}/privacy`}
          slugUrlT={`${slugUrl}/privacy/`}
          title="My Privacy"
        />
        {/* My Security */}
       <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}/security`}
          slugUrlT={`${slugUrl}/security/`}
          title="My Security"
        />
        </div>
    )
}

export default UserAccountSetting767;