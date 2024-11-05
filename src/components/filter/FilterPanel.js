import React, { useEffect, useState } from "react";
import Select from "../select/Select";
import RatingRange from "./RatingRange";
import useDebounce from "../../hooks/useDebounce";

const FilterPanel = ({ filters, setFilters, sortOption, setSortOption }) => {
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [isOpen, setIsOpen] = useState(true);
  const debouncedFiltersValue = useDebounce(debouncedFilters, 300);

  const handleCategoryChange = (e) => {
    setFilters((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleBrandChange = (e) => {
    setFilters((prev) => ({ ...prev, brand: e.target.value }));
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleRatingChange = (valueOne, valueTwo) => {
    setFilters((prev) => ({
      ...prev,
      rating: [valueOne, valueTwo],
    }));
  };

  const clearFilter = () => {
    setFilters({
      category: "",
      brand: "",
      rating: [0, 5],
    });
    setSortOption("default");
  };

  useEffect(() => {
    setDebouncedFilters(filters);
  }, [filters]);

  useEffect(() => {
    setFilters(debouncedFiltersValue);
  }, [debouncedFiltersValue, setFilters]);

  const toggleFilterPanel = () => {
    setIsOpen((prev) => !prev);
  };

  const categories = [
    { value: "", label: "All Categories" },
    { value: "Electronics", label: "Electronics" },
    { value: "Furniture", label: "Furniture" },
    { value: "Clothing", label: "Clothing" },
  ];

  const brands = [
    { value: "", label: "All Brands" },
    { value: "Brand A", label: "Brand A" },
    { value: "Brand B", label: "Brand B" },
    { value: "Brand C", label: "Brand C" },
    { value: "Brand D", label: "Brand D" },
    { value: "Brand E", label: "Brand E" },
  ];

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Rating" },
    { value: "popularity", label: "Popularity" },
  ];

  useEffect(() => {
    setDebouncedFilters(filters);
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("filters"));
    if (savedFilters) {
      setFilters(savedFilters);
    }
  }, [setFilters]);

  return (
    <>
      <div className={`filter-panel ${isOpen ? "" : "hidden"}`}>
        <div style={{ width: "100%" }}>
          <div className="clear-top" onClick={clearFilter}>
            <p className="clear-text">CLEAR</p>
            <div>
              <img
                width={14}
                height={14}
                alt="clear-icon"
                src={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAIVBMVEX///8AAACzs7O3t7e7u7u1tbW8vLyxsbF9fX2oqKitra3sVcayAAAFAUlEQVR4nO2d22LjIAxES+Ikbf//g3e17iVxsBEgwYw284xbnRyMbxi/vb3yyiuoOV9mV1CZ07mu/ZLS4lOJU/4WfK1pf02JC3GRgisQ/7VnQqwt+JoSF+LyXbDS4k97FsTagu/acyA+FKyweEmJC3GpLPicEhfisi24YPGybY+O+ARYKDgDiI2YATws+KmLoiNmAVPaPYG75dvjIu4AprRzUp3tosiIu4A7FncNoiIeAKZ0em5/YBAT8RAwY/HQICJiATCl22P7U6k9GmIRcNNRP8vtsRAVgA8WPzTtDw4zw7Nz4N7m82cDRR+FQlQC3vdTlXQYRC3gw27FhNgEyISoBXyqlAWxGZAFUQuYPfdmQGwYRe+Dj9gJiI/Y1UXXYCN2G5QgIxoYlOAimhiUoCIaGZRgIhoCYiKaddE1eIimBiVoiMYGJViI5gYlSIgOBiU4iC4GJVpE73k3TgYlWsSGP10RN4PufxyjBscOooz2NmdzBbMtFp4WWfz/uRbdDUpmWhxgUDLP4hCDklmIgwxK5iBqAU3+6wxEbRc12v/HIw7somtGIw4bZH4zFnG4QclIxAkGJeMQtQbNr0xHIU6cUzAGcZpByQjEybNC/BGnT3vxvtKYDtg1TUARAEBfRAhAT0QQQD9EGEAvRCBAH0QoQA/EqWcyuVgj+h6EmmJbEiCgbVGQgJZDAyigHSIsoBUiMKANIjSgBSI4YD8iPGAvIgFgHyLcqVo+7YiTbvzWpxVx6OOzvrQh0hiUtCASGZTUI1IZlNQikhmU1CESAtYh0nXRNfqyKQ1KtIjvrID6vYsWUG+RFtDSIiignUVYQCuLwIA2FqEBLSyCA/YjwgP2dlQCwD6LJCvftlukMChptUhiUNJmkcagpMUikUFJvUUqg5Jai2QGJXWIhIB1HZWui67RW6Q0KNHek3mfXWhrwjsMvx+GH0vDHw/Dn9OEPy8Nf20R/vow/DV++Ps04e+1hb9fGv6ed/jnFuGfPYV/fhj+GXD45/jh52KEn0+jn/ZFOicq/Ly28HMTveaXzl7D/yd+c4RBED3neUMg+s7VB0D0ft9iOqL/OzO0LwWRWOx7+4zg3bXeEuER+wsER7QoD3q4sfn9gRGtOhgsot0eBIpoOURAItqOgYCI1oM8HKL9UQwM0WPlPShEn9UTgRC9loeEQfRb/xIE0XOBTwhE3xVMARC9l2idjhh+DVqkdYRd5t1grQXtgIi2nrf5Yxu8NdmNLYZfVz/8txHCf98i/DdKwn9nJvy3gsJ/7yn8N7vCf3ct/LfzZn+L1N3i/C+ROlucbVDianG+QYnjoR/BoMTt0I8C6NZRMbroGpfhBsegxMEikkGJuUUsgxJji2gGJaYW8QxKDC0iGpSYHfoxDUqMDv24gEYdFbWLrjEYbpANSrotYhuUdFpENyjpGm7wDUo6DhoMBiXNM/w5DEoan/WzGJRoLS73GzEBNiGyvdVZX++HbgMMgxKlxY/fLW6a9tPfIruLyuKtcgskQJXFzT5VtIgFqHBy225R+FHQAFsKPrSIB1iwmB32D34URMCWgnctYgIeIO4e13a8owK2FJy1iAu4Y/HwzCSDiAyYtVg49Xqam4ANmLFYLPjCBfhkUXHyfOYC3DhRFXziAnxwory+W7gA7xCv2i2+EJdyS5Ccqwu+cgF+OVEb/NqCCbCl4AvKPRltTiyDxiuv/I/5A3thQ1YwKrvPAAAAAElFTkSuQmCC"
                }
              />
            </div>
          </div>
          <Select
            options={categories}
            value={filters.category}
            onChange={handleCategoryChange}
            label={"Select Category"}
          />
          <Select
            options={brands}
            value={filters.brand}
            onChange={handleBrandChange}
            label={"Select Brand"}
          />
          <Select
            options={sortOptions}
            value={sortOption}
            onChange={handleSortChange}
            label={"Sort By"}
          />
          <RatingRange onRatingChange={handleRatingChange} filters={filters} />
        </div>
        <div onClick={toggleFilterPanel} className="back-filter">
          <img
            width={32}
            height={32}
            src={
              !isOpen
                ? "https://cdn-icons-png.flaticon.com/512/32/32213.png"
                : "https://icons.veryicon.com/png/o/miscellaneous/zero-net-icon/left-icon.png"
            }
            alt="close-filter"
          />
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
