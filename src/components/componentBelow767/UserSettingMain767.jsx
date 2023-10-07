import { Outlet } from "react-router-dom"


const UserSettingMain767 = () => {
    return(
            <>
              <section className="user-setting-sm"><h3>Settings</h3></section>
              <section className="user-setting-sm-b">
                  <Outlet />
              </section>
            </>
    )
}


export default UserSettingMain767