
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { handledAPIPost } from "../apis/apis";
import { useState } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import instance from "../api-instance";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const [payment, setPayment] = useState("cod");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  const processOrder = async () => {
    try {
      setLoading(true);
      const response = await handledAPIPost("/order/place-order", cart);

      alert(response.msg);

      navigate(`/orderSuccess?orderNo=${response.orderNo}`);

      dispatch({ type: "cart_clear" });
    } catch (err) {
      alert("Something went wrong, Please try again later");
    } finally {
      setLoading(false);
    }
  };

  const makePayment = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);

    const response = await instance.post("/payment/get-payment-session", {
      products: cart.products,
    });

    const { id } = response.data;

    const result = await stripe.redirectToCheckout({
      sessionId: id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-5">
      <h1>Shopping Cart</h1>
      {(cart.products || []).map((item, index) => (
        <CartItem
          key={index}
          name={item.name}
          sku={item.sku}
          images={item.images}
          price={item.price}
          description={item.description}
          category={item.category}
          sellerInfo={item.sellerInfo}
          qty={item.qty}
          animDelay={index * 250}
        />
      ))}
      {cart.products.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
          className="mb-4"
        >
          <h4>
            Grand Total: $
            {cart.products.reduce((p, c) => p + c.qty * c.price, 0)}
          </h4>
          <div>
            <input
              type="radio"
              name="payment"
              value="cod"
              id="cod"
              checked={payment === "cod"}
              onChange={handlePaymentChange}
            />
            &nbsp;
            <label htmlFor="cod">Cash On Delivery</label>&nbsp;&nbsp;
            <input
              type="radio"
              name="payment"
              value="online"
              id="online"
              checked={payment === "online"}
              onChange={handlePaymentChange}
            />
            &nbsp;
            <label htmlFor="online">Online Payment</label>
          </div>
          <button
            onClick={() => {
              if (payment === "online") {
                makePayment();
              } else {
                processOrder();
              }
            }}
            className="btn btn-primary"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

