import { Fragment, useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import './navigation.styles.scss';

//components
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

//assets
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

// contexts 
import { UserContext } from "../../contexts/user.context";
import { CartDropdownContext } from '../../contexts/cart-dropdown.context';

// firebase
import { signOutUser } from "../../utils/firebase/firebase.util";


const Navigation = () => {

  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartDropdownContext);

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
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}

      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation