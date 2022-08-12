// react, redux
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
// routes
import Home from './routes/home/home.component.jsx';
import Navigation from './routes/navigation/navigation.component.jsx';
import Authentication from './routes/authentication/authentication.component.jsx';
import Shop from './routes/shop/shop.component.jsx';
import Checkout from './routes/checkout/checkout.component.jsx'
//redux actions
import { checkUserSession } from './store/user/user.action';

const App = () => {
  const dispatch = useDispatch();
  // to sing in/ sign out listener unsubscribe
  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch]);

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


