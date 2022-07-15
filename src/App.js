import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createUserDocumentFromAuth, onAuthStateChangeListener } from './utils/firebase/firebase.util';
import { getCollectionAndDocuments } from "./utils/firebase/firebase.util.js";

import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component.jsx';
import Navigation from './routes/navigation/navigation.component.jsx';
import Authentication from './routes/authentication/authentication.component.jsx';
import Shop from './routes/shop/shop.component.jsx';
import Checkout from './routes/checkout/checkout.component.jsx'

import { setCurrentUser } from './store/user/user.action';
import { setCategoriesMap } from './store/categories/category.action'

const App = () => {
  const dispatch = useDispatch();

  // to sing in/ sign out listener unsubscribe
  // it mounts only once, return the auth state and end its cycle
  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesMap = await getCollectionAndDocuments();
      dispatch(setCategoriesMap(categoriesMap))
    };
    getCategoriesMap();
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        {/* '/*' matches anything which contains 'shop/' */}
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App;


