import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img className="card-image" src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Brand:</strong> {product.brand}
      </p>
      <p>
        <strong>Price:</strong> ${product.price.toFixed(2)}
      </p>
      <p>
        <strong>Rating:</strong> {product.rating} / 5
      </p>
    </div>
  );
};

export default ProductCard;
