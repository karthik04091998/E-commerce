
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { handledAPIGet } from "../apis/apis";
import { Link } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

const Product = ({ name, price, images, animDelay = 0 }) => {
  return (
    <div className="card m-2 d-inline-block zoom-in-animation" style={{ animationDelay: `${animDelay}ms` }}>
      <img src={images[0]} className="card-img-top" alt={name} style={{ height: 200, width: 300, objectFit: "contain" }} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  animDelay: PropTypes.number, // optional prop with default value
};


const ProductListing = () => {
  const { userInfo = { userType: "customer", userId: "" } } = useSelector(
    (state) => state.account || {}
  );

  const [openForm, setFormState] = useState(false);

  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const products = await handledAPIGet(
        userInfo.userType === "seller"
          ? `/products/seller/${userInfo.userId}`
          : "/products/available"
      );

      setProducts(products);
    } catch (err) {
      console.log(err.message);
    }
  };

useEffect(() => {
  loadProducts();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

return (
  <div className="container mt-5">
    <h1>Product Listing</h1>
    <button onClick={() => setFormState(true)} className="btn btn-primary">
        Add New Product
      </button>
      {openForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            placeItems: "center",
            placeContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            className="bg-white p-4"
            style={{ minWidth: 500, height: 600, overflowY: "scroll" }}
          >
            <button onClick={() => setFormState(false)}>X</button>
            <ProductForm />
          </div>
        </div>
      )}
    <div className="container m-4">
    {products.map((product, index) =>
    userInfo.userType === "seller" ? (
      <Product key={product.sku} {...product} animDelay={index * 200} />
          ) : (
      <Link key={product.sku} to={`/products/${product.sku}`}>
        <Product  {...product} animDelay={index * 100} />
      </Link>
    ))}
    </div>
  </div>

);
};


export default ProductListing;
