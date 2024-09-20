
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Product = ({
  name,
  sku,
  images,
  price,
  description,
  availableQty,
  category,
  sellerInfo,
}) => {
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    dispatch({
      type: "cart_add",
      product: {
        name,
        sku,
        images,
        price,
        description,
        category,
        sellerInfo,
        qty,
      },
    });
  };

  return (
    <div className="card mb-4 d-inline-block zoom-in-animation">
      <div className="card-header">
        <h2>{name}</h2>
        <small className="text-muted">SKU: {sku}</small>
      </div>
      <div className="card-body">
        <div
          id={`carousel-${sku}`}
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            {(images || []).map((image, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={image}
                  style={{ height: 300, width: 400, objectFit: "contain" }}
                  alt={`${name} ${index}`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src =
                      "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
                  }}
                />
              </div>
            ))}
          </div>
          <a
            className="carousel-control-prev"
            href={`#carousel-${sku}`}
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon text-secondary"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href={`#carousel-${sku}`}
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        <h3 className="mt-3">Price: ${(price || 0).toFixed(2)}</h3>
        <p>{description}</p>
        <p>Available Quantity: {availableQty}</p>
        <p>
          Category:{" "}
          <span className="badge badge-secondary text-bg-secondary">
            {category}
          </span>
        </p>
        <div className="seller-info mt-3">
          <h5>Seller Information</h5>
          <p>{sellerInfo?.name || ""}</p>
        </div>
        <select name="qty" onChange={(e) => setQty(e.target.value)}>
          {Array.from(new Array(10)).map((v, index) => (
            <option key={v} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  availableQty: PropTypes.number.isRequired,
  category: PropTypes.oneOf(["electronics", "sports", "fashion"]).isRequired,
  sellerInfo: PropTypes.string.isRequired,
};

export default Product;
