import { useState } from "react";
import { handledAPIPost } from "../apis/apis";
const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    price: "",
    description: "",
    images: "",
    availableQty: "",
    category: "electronics",
  });

  const [errors, setErrors] = useState({
    name: "",
    sku: "",
    price: "",
    description: "",
    images: "",
    availableQty: "",
    category: "electronics",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.name === "") {
      setErrors({
        ...errors,
        name: "This is required",
      });
    } else {
      // Convert images from a comma-separated string to an array
      const productData = {
        ...product,
        images: product.images.split(",").map((img) => img.trim()),
      };

      await handledAPIPost("/products", productData);
      setProduct({
        name: "",
        sku: "",
        price: "",
        description: "",
        images: "",
        availableQty: "",
        category: "electronics",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
          <br />
          <span style={{ color: "red" }}>{errors.name}</span>
        </div>
        <div className="mb-3">
          <label className="form-label">SKU</label>
          <input
            type="text"
            className="form-control"
            name="sku"
            value={product.sku}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Images (comma separated URLs)</label>
          <input
            type="text"
            className="form-control"
            name="images"
            value={product.images}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Available Quantity</label>
          <input
            type="number"
            className="form-control"
            name="availableQty"
            value={product.availableQty}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="cosmetics">Cosmetics</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mb-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;