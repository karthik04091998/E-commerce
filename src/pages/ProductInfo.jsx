
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import { handledAPIGet } from "../apis/apis";
import Loader from "../components/Loader";

const ProductInfo = () => {
  const { productSku } = useParams();

  const [loading, setLoading] = useState(false);

  const [currentProduct, setProduct] = useState({});

  const loadProduct = async () => {
    try {
      setLoading(true);
      const product = await handledAPIGet(`/products/available/${productSku}`);
      setProduct(product);
      setLoading(false);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    loadProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="m-4">
      <h1>Product Info</h1>
      <p>SKU: {productSku}</p>
      {/* Individual product information goes here */}
      <Product {...currentProduct} />
    </div>
  );
};

export default ProductInfo;
