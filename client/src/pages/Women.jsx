import React, { useEffect, useState } from "react";
import Breadcrumbs from '../components/BreadCrumbs';
import ProductFilter from '../components/ProductFilter';
import ProductGrid from '../components/ProductGrid';
import ProductSort from '../components/ProductSort';
const api = import.meta.env.VITE_API_URL || "http://localhost:3001";
export default function Women() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState("Women");
    const [isLoading, setIsLoading] = useState(true);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6; // Change this number based on your preference
    // Fetch products from API
    useEffect(() => {
        async function fetchProducts() {
            try {
                setIsLoading(true);
                const response = await fetch(`${api}/api/products/women`);
                const result = await response.json();
                setProducts(result);
                setFilteredProducts(result);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // Handle filter changes
    const handleFilterChange = (filters) => {
        if (Object.keys(filters).length === 0) {
            // If filters are empty, reset to all products
            setFilteredProducts(products);
            return;
        }

        // Apply filters
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
            filtered = filtered.filter((product) => filters.colors.includes(product.color)); // Assuming color is a property in the product object
        }
        if (filters.width) {
            filtered = filtered.filter((product) => product.width === filters.width); // Assuming width is a property in the product object
        }

        setFilteredProducts(filtered);
    };

    // Handle sorting
    const handleSortChange = (sortOrder) => {
        const sortedProducts = [...filteredProducts];
        if (sortOrder === 'price-low-to-high') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'price-high-to-low') {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        setFilteredProducts(sortedProducts);
    };

    return (
        <>
            <Breadcrumbs currentPage="Women" />
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
                            {/* Show loading spinner while products are being fetched */}
                            {isLoading ? (
                                <div className="spinner-container">
                                    <div className="spinner"></div>
                                    <p>Loading products...</p>
                                </div>
                            ) : (
                                <ProductGrid products={filteredProducts} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
