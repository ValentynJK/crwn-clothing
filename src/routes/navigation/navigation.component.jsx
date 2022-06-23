import { Fragment, useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.util";

import './navigation.styles.scss'

const Navigation = () => {

  const { currentUser } = useContext(UserContext);

  return (
    <Fragment>
      <div className="navigation">
        <NavLink className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </NavLink>
        <div className="nav-links-container">
          <NavLink className="nav-link" to="/shop" >
            SHOP
          </NavLink>
          {currentUser ?
            (<span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>) :
            (<NavLink className="nav-link" to="/auth" >
              SIGN IN
            </NavLink>)
          }
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation