import React, { useEffect, useState } from 'react';
import { useLocation ,Link} from 'react-router-dom';
import { fetchProductsBySearch } from '../utils/api';

export default function SearchResults() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (query) {
            const fetchResults = async () => {
                const results = await fetchProductsBySearch(query);
                setProducts(results);
            };
            fetchResults();
        }
    }, [query]);

    return (
        <div className='container'>
            <h2>Search Results for "{query}"</h2>
            {products.length > 0 ? (
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card row">
                            <div className='col-lg-1'>
                                <Link to={`/products/${product.id}`}>
                                <img src={product.image_urls[0]} alt={product.name} />
                                </Link></div>
                            <div className='col-lg-4'>
                                <h3>{product.name}</h3>
                                <p>{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
}
