import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Catalog from "./Catalog";
import { products } from "./mockData";

describe("Product Catalog Filtering System", () => {
  test("renders product catalog and filter components", () => {
    render(<Catalog products={products} />);

    expect(screen.getByText(/Product Catalog/i)).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /category/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Price Range/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rating/i)).toBeInTheDocument();
  });

  test("filters product list based on user input", () => {
    render(<Catalog products={products} />);

    fireEvent.change(screen.getByRole("combobox", { name: /category/i }), {
      target: { value: "Electronics" },
    });
    expect(screen.getByText(/Filtered Products/i)).toBeInTheDocument();
    expect(screen.queryByText(/Laptop/i)).toBeInTheDocument();
    expect(screen.queryByText(/Shirt/i)).not.toBeInTheDocument();
  });

  test("updates filtering in real time when filter values change", () => {
    render(<Catalog products={products} />);

    const ratingInput = screen.getByLabelText(/Rating/i);
    fireEvent.change(ratingInput, { target: { value: "4" } });

    expect(screen.queryByText(/Shirt/i)).toBeInTheDocument();
    fireEvent.change(ratingInput, { target: { value: "5" } });
    expect(screen.queryByText(/Shirt/i)).not.toBeInTheDocument();
  });

  test("displays message when no products match the filter criteria", () => {
    render(<Catalog products={products} />);

    fireEvent.change(screen.getByRole("combobox", { name: /category/i }), {
      target: { value: "Nonexistent Category" },
    });

    expect(screen.getByText(/No products found/i)).toBeInTheDocument();
  });

  test("sorts products correctly", () => {
    render(<Catalog products={products} />);

    fireEvent.change(screen.getByRole("combobox", { name: /sort by/i }), {
      target: { value: "Price: Low to High" },
    });

    const productNames = screen
      .getAllByTestId("product-name")
      .map((node) => node.textContent);
    const sortedNames = [...productNames].sort();

    expect(productNames).toEqual(sortedNames);
  });
});
