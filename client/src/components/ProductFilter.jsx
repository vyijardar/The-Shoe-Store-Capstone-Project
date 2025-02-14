import React, { useState, useEffect } from "react";
const api = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function ProductFilter({ onFilterChange }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${api}/api/products`);
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Extract unique filter options
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];
  const sizes = [...new Set(products.flatMap((p) => p.size || []))].sort((a, b) => {
    // Convert sizes to numbers if they are numeric, otherwise sort alphabetically
    const numA = parseFloat(a);
    const numB = parseFloat(b);
  
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB; 
    }
    return a.localeCompare(b); 
  });
  const colors = ["Black", "White", "Red", "Blue", "Green", "Brown"];

  // Toggle color selection
  const toggleColor = (color) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color) ? prevColors.filter((c) => c !== color) : [...prevColors, color]
    );
  };

  // **Handles applying multiple filters together**
  const handleFilterUpdate = () => {
    onFilterChange({
      category: category || null,
      minPrice: minPrice ? parseFloat(minPrice) : 0,
      maxPrice: maxPrice ? parseFloat(maxPrice) : Infinity,
      brand: brand || null,
      size: size || null,
      colors: selectedColors.length > 0 ? selectedColors : null,
    });
  };

  // Clears all filters
  const handleClearFilters = () => {
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setBrand('');
    setSize('');
    setSelectedColors([]);
    onFilterChange({});
  };

  return (
    <div className="row">
      <div className="product-filter">
        <h4>Filter Shoes</h4>

        {/* Category Filter */}
        <div className="col-sm-12">
          <div className="side border mb-1">
            <h3>Category</h3>
            <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Filter */}
        <div className="col-sm-12">
          <div className="side border mb-1">
            <h3>Price</h3>
            <input
              type="number"
              className="form-control mb-1"
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
          </div>
        </div>

        {/* Brand Filter */}
        <div className="col-sm-12">
          <div className="side border mb-1">
            <h3>Brand</h3>
            <select className="form-control" value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">All</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Size Filter */}
        {/* Size Filter */}
        <div className="col-sm-12">
          <div className="side border mb-1">
            <h3>Size</h3>
            <div className="block-26">
              <ul className="d-flex flex-wrap">
                {sizes.map((sizeOption) => (
                  <li key={sizeOption} className="me-2">
                    <div
                      className={`p-2 size-filter border rounded ${size === sizeOption ? "bg-primary text-white" : "bg-light"}`}
                      onClick={
                        () =>{ setSize(sizeOption);
                              handleFilterUpdate();
                            }}
                    >
                      {sizeOption}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>


        {/* Color Filter */}
        <div className="col-sm-12">
          <div className="side border mb-1">
            <h3>Colors</h3>
            <ul className="d-flex flex-wrap">
              {colors.map((color) => (
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

        {/* Filter Actions */}
        <div className="text-center">
          <button className="btn btn-primary me-2" onClick={handleFilterUpdate}>
            Apply Filters
          </button>
          <button className="btn btn-secondary" onClick={handleClearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
