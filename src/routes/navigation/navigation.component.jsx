import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'

//components
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

//assets
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

// contexts 
import { CartContext } from '../../contexts/cart.context';

// firebase
import { signOutUser } from "../../utils/firebase/firebase.util";

// styles
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles';

import { selectCurrentUser } from "../../store/user/user.selector";

const Navigation = () => {

  const currentUser = useSelector(selectCurrentUser);
  // const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop" >
            SHOP
          </NavLink>
          {currentUser ?
            (<NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>) :
            (<NavLink to="/auth" >
              SIGN IN
            </NavLink>)
          }
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}

      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation