import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  return (
    <div className="product-list" style={styles.list}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const styles = {
  list: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

export default ProductList;
