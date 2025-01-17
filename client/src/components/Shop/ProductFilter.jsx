
import React, { useState } from "react";

const ProductFilter = ({ onFilterChange }) => {
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedWidth, setSelectedWidth] = useState(null);
  // Handle color selection toggle
  const toggleColor = (color) => {
    if (selectedColors.includes(color)) {
      setColor(selectedColors.filter((c) => c !== color));
    } else {
      setColor([...selectedColors, color]);
    }
  };
  const handleFilterUpdate = () => {
    onFilterChange({
      category,
      minPrice: parseFloat(minPrice) || 0,
      maxPrice: parseFloat(maxPrice) || Infinity,
      brand,
      size,
      color,
    });
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setCategory('All');
    setMinPrice(0);
    setMaxPrice(Infinity);
    setBrand('');
    setSize('');
    setSelectedColors([]);
    setSelectedWidth(null);
    onFilterChange({}); // Reset filters in parent component
  };
  return (
    <div className="row">
      <div className="product-filter">
        <h4>Filter Products</h4>
        {/* Categories Filter */}
        <div className="col-sm-12">
          <div className="side border mb-1">
            <h3>Categories</h3>
            <select className="form-control" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
              <option value="jewelery">Jewelery</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
        </div>
        {/* Price Filter */}
        <div className="col-sm-12">
          <div className="side border mb-1">
            <h3>Price</h3>
            <ul>
              <li>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </li>
            </ul>

          </div>
        </div>
        {/* Brand */}
        <div className="col-sm-12">
          <div className="side border mb-1">
            <h3>Brand</h3>
            <select
              className="form-control"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}>
              <option value="">All</option>
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Puma">Puma</option>
              <option value="Reebok">Reebok</option>
            </select>
          </div>
        </div>
        {/* Size/Width Filter */}
        <div className="col-sm-12">
          <div className="side border mb-1">
            <h3>Size/Width</h3>
            <div className="block-26 mb-2">
              <h4>Size</h4>
              <ul>
                {["7", "7.5", "8", "8.5", "9", "9.5", "10"].map((size) => (
                  <li key={size}> <button
                    key={size}
                    type="button"
                    className={` ${size === size ? "btn-primary" : "btn-outline-primary"}`}

                    onClick={() =>
                      setSize(size === size ? null : size)
                    }>
                    {size}
                  </button></li>
                ))}
              </ul>
            </div>
            <div className="block-26">
              <h4>Width</h4>
              <ul>
                {["N", "R", "W"].map((width) => (
                  <li key={width}>
                    <button
                      key={width}
                      type="button"
                      className={` ${selectedWidth === width ? "btn-primary" : "btn-outline-primary"
                        }`}
                      onClick={() =>
                        setSelectedWidth(selectedWidth === width ? null : width)
                      }
                    >
                      {width}
                    </button> </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Color Filter */}
        <div className="col-sm-12">
          <div className="side border mb-1">
            <h3>Colors</h3>
            <ul>
              {["Black", "White", "Red", "Blue", "Green"].map((color) => (
                <li key={color} className="form-check me-2">
                  <input
                    type="checkbox"
                    id={color}
                    className="form-check-input"
                    checked={selectedColors.includes(color)}
                    onChange={() => toggleColor(color)}
                  />
                  <label
                    htmlFor={color}
                    className="form-check-label"
                    style={{
                      display: "inline-block",
                      width: "20px",
                      height: "20px",
                      backgroundColor: color.toLowerCase(),
                      borderRadius: "50%",
                      border: "1px solid #ddd",
                    }}
                  ></label>
                </li>
              ))}

            </ul>
          </div>

        </div>
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleFilterUpdate}>
            Apply Filters
          </button>
          <button className="btn btn-secondary" onClick={handleClearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
