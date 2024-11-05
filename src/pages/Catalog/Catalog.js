import React, { useState, useEffect, useMemo } from "react";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import "./Catalog.css";
import NoProductMessage from "../../components/message/NoProduct";
import FilterPanel from "../../components/filter/FilterPanel";
import ProductList from "../../components/product/ProductList";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    rating: [0, 5],
  });
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);
  const URL = "/data/mockData.json";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortedAndFilteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchCategory =
        !filters.category || product.category === filters.category;
      const matchBrand = !filters.brand || product.brand === filters.brand;
      const matchRating =
        product.rating >= filters.rating[0] &&
        product.rating <= filters.rating[1];

      return matchCategory && matchBrand && matchRating;
    });

    switch (sortOption) {
      case "price-asc":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-desc":
        return filtered.sort((a, b) => b.price - a.price);
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }, [products, filters, sortOption]);

  return (
    <div className="catalog">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
          <ProductList products={sortedAndFilteredProducts} />
        </>
      )}
      {!loading && !sortedAndFilteredProducts.length && <NoProductMessage />}
    </div>
  );
};

export default Catalog;
