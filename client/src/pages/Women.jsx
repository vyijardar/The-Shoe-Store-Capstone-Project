import React, { useEffect, useState } from "react";
import Breadcrumbs from '../components/BreadCrumbs';
import ProductFilter from '../components/ProductFilter';
import ProductGrid from '../components/ProductGrid';
import ProductSort from '../components/ProductSort';
import men from '../assets/images/men.jpg';
import men1 from '../assets/images/item-9.jpg';
import men2 from '../assets/images/item-11.jpg';

export default function Women() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState("Women"); 
    
    // Fetch products from API
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("http://localhost:3001/api/products/women");
                const result = await response.json();
                setProducts(result);
                setFilteredProducts(result);
            } catch (error) {
                console.error('Error fetching products:', error);
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
            filtered = filtered.filter((product) => product.size === filters.size); // Assuming size is a property in the product object
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
                            <ProductGrid products={filteredProducts} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="colorlib-featured">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 text-center">
                            <div className="featured">
                                <div
                                    className="featured-img featured-img-2"
                                    style={{ backgroundImage: `url(${men})` }}>
                                    <h2>Dress</h2>
                                    <p>
                                        <a href="#" className="btn btn-primary btn-lg">
                                            Shop now
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 text-center">
                            <div className="featured">
                                <div
                                    className="featured-img featured-img-2"
                                    style={{ backgroundImage: `url(${men1})` }}>
                                    <h2>Casuals</h2>
                                    <p>
                                        <a href="#" className="btn btn-primary btn-lg">
                                            Shop now
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 text-center">
                            <div className="featured">
                                <div
                                    className="featured-img featured-img-2"
                                    style={{ backgroundImage: `url(${men2})` }}>
                                    <h2>Sports</h2>
                                    <p>
                                        <a href="#" className="btn btn-primary btn-lg">
                                            Shop now
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
