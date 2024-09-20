import { Provider, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Layout';
import store from "./store/store";
import "./App.css";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";


const Login = lazy(() => import("./pages/Login"));
const Registration = lazy(() => import("./pages/Registration"));
const ProductListing = lazy(() => import("./pages/ProductListing"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Cart = lazy(() => import("./pages/Cart"));
const ProductInfo = lazy(() => import("./pages/ProductInfo"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));

const ProtectedComponent = ({ component }) => {
  const { authenticated } = useSelector((state) => state.account);

  if (authenticated) {
    return component;
  }

  return <Navigate to="/login" />;
};

ProtectedComponent.propTypes = {
  component: PropTypes.node.isRequired,
};

function App() {
  return (
    <Suspense fallback={<Loader/>}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<ProtectedComponent component={<ProductListing />} />} />
              <Route path="/profile" element={<ProtectedComponent component={<UserProfile />} />} />
              <Route path="/cart" element={<ProtectedComponent component={<Cart />} />} />
              <Route path="/orderSuccess" element={<ProtectedComponent component={<OrderSuccess />} />} />
              <Route path="/Products/:productSku" element={<ProtectedComponent component={<ProductInfo />} />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </Router>
      </Provider>
    </Suspense>

  );
}

export default App;
