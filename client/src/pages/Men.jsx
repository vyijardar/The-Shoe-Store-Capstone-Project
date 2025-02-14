import React, { useEffect, useState } from "react";
import Breadcrumbs from "../components/BreadCrumbs";
import ProductFilter from "../components/ProductFilter";
import ProductGrid from "../components/ProductGrid";
import ProductSort from "../components/ProductSort";
const api = import.meta.env.API_URL || "http://localhost:3001";

export default function Men() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("Men");
  const [isLoading, setIsLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Change this number based on your preference

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const response = await fetch(`${api}/api/products/men`);
        const result = await response.json();

        if (!Array.isArray(result)) {
          throw new Error("Invalid response format: Expected an array");
        }
        setProducts(result);
        setFilteredProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Handle filter changes
  const handleFilterChange = (filters) => {
    if (Object.keys(filters).length === 0) {
      setFilteredProducts(products);
      setCurrentPage(1); // Reset to first page when filter changes
      return;
    }

    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category);
    }
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((product) => product.price >= filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((product) => product.price <= filters.maxPrice);
    }
    if (filters.brand) {
      filtered = filtered.filter((product) => product.name.includes(filters.brand));
    }
    if (filters.size) {
      filtered = filtered.filter((product) =>
        Array.isArray(product.size) ? product.size.includes(filters.size) : product.size === filters.size
      );
    }    
    if (filters.colors && filters.colors.length > 0) {
      filtered = filtered.filter((product) =>
        filters.colors.some((color) => product.color.toLowerCase().includes(color.toLowerCase()))
      );
    }
    if (filters.width) {
      filtered = filtered.filter((product) => product.width === filters.width);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset page after filtering
  };

  // Handle sorting
  const handleSortChange = (sortOrder) => {
    const sortedProducts = [...filteredProducts];
    if (sortOrder === "price-low-to-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-high-to-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  };

  // **Pagination Logic**
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Breadcrumbs currentPage="Men" />
      <div className="breadcrumbs-two">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>{category}'s Shoes</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="colorlib-product">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-xl-3">
              <ProductFilter onFilterChange={handleFilterChange} />
            </div>
            <div className="col-lg-9 col-xl-9">
              <ProductSort onSortChange={handleSortChange} />

              {/* Show loading spinner while fetching data */}
              {isLoading ? (
                <div className="spinner-container">
                  <div className="spinner"></div>
                  <p>Loading products...</p>
                </div>
              ) : (
                <>
                  <ProductGrid products={currentProducts} />

                  {/* Pagination Controls */}
                  {filteredProducts.length > productsPerPage && (
                    <div className="pagination">
                      <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                        Previous
                      </button>
                      <span>
                        Page {currentPage} of {totalPages}
                      </span>
                      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
