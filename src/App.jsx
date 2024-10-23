import "./App.css";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Pages/home";
import { Fragment } from "react";
import Footer from "./Pages/home/Footer";
import Navbar from "./Pages/home/Navbar";
import ProductCard from "./components/ProductCard";
import Eastern from "./Pages/women/Eastern";
import Western from "./Pages/women/Western";
import Boys from "./Pages/kids/Boys";
import Girls from "./Pages/kids/Girls";
import Infant from "./Pages/kids/Infant";
import Mala from "./Pages/jewellery/Mala";
import Studs from "./Pages/jewellery/Studs";
import Rings from "./Pages/jewellery/Rings";
import Bracelet from "./Pages/jewellery/Bracelet";
import ProductDetail from "./components/ProductDetail";
import Sets from "./Pages/jewellery/Sets";
import Cart from "./Pages/cart/Cart";
import AddProducts from "./Pages/Admin/AddProducts";
import Signup from "./Pages/Auth/Signup";
import OrderList from "./Pages/Admin/SeeOrder";
import ProductList from "./Pages/Admin/Listing";

const Layout = () => {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/admin" element={<AddProducts />}></Route>
        <Route path="/see" element={<OrderList />} />
        <Route path="/see-all" element={<ProductList />} />

        <Route />
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="women">
            <Route path="traditional">
              <Route path="eastern" element={<Eastern />} />
              <Route path="eastern/:id" element={<ProductDetail />} />

              <Route path="western" element={<Western />} />
              <Route path="western/:id" element={<ProductDetail />} />
            </Route>
            <Route path="turkish">
              <Route path="eastern" element={<Eastern />} />
              <Route path="eastern/:id" element={<ProductDetail />} />

              <Route path="western" element={<Western />} />
              <Route path="western/:id" element={<ProductDetail />} />
            </Route>
          </Route>
          <Route path="kids">
            <Route path="boys" element={<Boys />} />
            <Route path="boys/:id" element={<ProductDetail />} />

            <Route path="girls" element={<Girls />} />
            <Route path="girls/:id" element={<ProductDetail />} />

            <Route path="infant" element={<Infant />} />
            <Route path="infant/:id" element={<ProductDetail />} />
          </Route>
          <Route path="jewellery">
            <Route path="traditional">
              <Route path="rings" element={<Rings />} />
              <Route path="rings/:id" element={<ProductDetail />} />

              <Route path="studs" element={<Studs />} />
              <Route path="studs/:id" element={<ProductDetail />} />

              <Route path="mala" element={<Mala />} />
              <Route path="mala/:id" element={<ProductDetail />} />

              <Route path="bracelet" element={<Bracelet />} />
              <Route path="bracelet/:id" element={<ProductDetail />} />

              <Route path="sets" element={<Sets />} />
              <Route path="sets/:id" element={<ProductDetail />} />
            </Route>
            <Route path="turkish">
              <Route path="rings" element={<Rings />} />
              <Route path="rings/:id" element={<ProductDetail />} />

              <Route path="studs" element={<Studs />} />
              <Route path="studs/:id" element={<ProductDetail />} />

              <Route path="mala" element={<Mala />} />
              <Route path="mala/:id" element={<ProductDetail />} />

              <Route path="bracelet" element={<Bracelet />} />
              <Route path="bracelet/:id" element={<ProductDetail />} />

              <Route path="sets" element={<Sets />} />
              <Route path="sets/:id" element={<ProductDetail />} />
            </Route>
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
