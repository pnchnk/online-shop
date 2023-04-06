import React from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Main from './screens/Main';
import ProductPage from './screens/Product';
import Smartphones from './screens/Smartphones';
import Laptops from './screens/Laptops';
import Cart from './screens/Cart';
import Groceries from './screens/Groceries';
import Fragrances from './screens/Fragrances';
import Skincare from './screens/Skincare';
import HomeDecorations from './screens/HomeDecorations';

function App() {
  let navigate = useNavigate()
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Main/>} />
          <Route path=":id" element={<ProductPage/>} />
        </Route>
        <Route path='/smartphones/'>
          <Route index element={<Smartphones/>} />
          <Route path=":id" element={<ProductPage/>} />
        </Route>
        <Route path='/laptops/'>
          <Route index element={<Laptops/>} />
          <Route path=":id" element={<ProductPage/>} />
        </Route>
        <Route path='/groceries/'>
          <Route index element={<Groceries/>} />
          <Route path=":id" element={<ProductPage/>} />
        </Route>
        <Route path='/skincare/'>
          <Route index element={<Skincare/>} />
          <Route path=":id" element={<ProductPage/>} />
        </Route>
        <Route path='/home_decorations/'>
          <Route index element={<HomeDecorations/>} />
          <Route path=":id" element={<ProductPage/>} />
        </Route>
        <Route path='/fragrances/'>
          <Route index element={<Fragrances/>} />
          <Route path=":id" element={<ProductPage/>} />
        </Route>
        <Route path='/cart/'>
          <Route index element={<Cart/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
