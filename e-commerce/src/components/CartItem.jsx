import PropTypes from "prop-types";

const CartItem = ({
    name,
    sku,
    images,
    price,
    description,
    category,
    sellerInfo,
    qty,
    animDelay,
  }) => {
    return (
      <div
        className="card mb-3 from-right-animation"
        style={{ animationDelay: `${animDelay}ms` }}
      >
        <div className="row g-0">
          <div className="col-md-4 text-center">
            <img
              src={images[0]}
              style={{ height: 300, width: 400, objectFit: "contain" }}
              className="img-fluid rounded-start"
              alt={name}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">SKU: {sku}</p>
              <p className="card-text">Price: ${price.toFixed(2)}</p>
              <p className="card-text">Description: {description}</p>
              <p className="card-text">Category: {category}</p>
              <p className="card-text">Seller Info: {sellerInfo.name}</p>
              <p className="card-text">Quantity: {qty}</p>
              <p className="fw-bold card-text ">Subtotal: ${qty * price}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  CartItem.propTypes = {
    name: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.oneOf(["electronics", "sports", "fashion"]).isRequired,
    sellerInfo: PropTypes.string.isRequired,
    qty: PropTypes.number.isRequired,
    animDelay: PropTypes.number.isRequired,
  };
  
  export default CartItem;