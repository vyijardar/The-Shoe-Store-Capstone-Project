import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate for navigation
import Breadcrumbs from './BreadCrumbs';
import { CartContext } from '../context/CartContext';
import { Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faMinus, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
const api = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [size, setSize] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    // const [selectedWidth, setSelectedWidth] = useState(null);
    const { addToCart, cartItems } = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(true); // Added loading state
    function incrementQuantity() {
        setQuantity((prevQuantity) => prevQuantity + 1);
    }
    function decrementQuantity() {
        if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1);
    }
    function handleSizeSelection(size) {
        setSelectedSize(size);
    }
    function handleAddToCart() {
        if (!selectedSize) {
            alert("Please select a size  before adding to the cart.");
            return;
        }

        const newItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image_urls: product.image_urls[0],
            quantity,
            selectedSize,
            // selectedWidth: selectedWidth,
        };

        addToCart(newItem);
        alert("Product Successfully added to cart !!");
    }

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`${api}/api/products/${id}`);
                const result = await response.json();
                setProduct(result);
                if (result.size) {
                    setSize(result.size.sort((a, b) => parseFloat(a) - parseFloat(b))); // Sort numerically
                }

                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

 
        if (isLoading) {
            return (
                <div className="text-center mt-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p>Loading product details...</p>
                </div>
            );
        }

 

    return (
        <>
            <Breadcrumbs currentPage="Product Details" />
            <div className="colorlib-product">
                <div className="container">
                    <div className="row row-pb-lg product-detail-wrap">
                        <div className="col-sm-6">
                            <Carousel prevIcon={<FontAwesomeIcon icon={faChevronLeft} className="text-black" />} nextIcon={<FontAwesomeIcon icon={faChevronRight} className="text-black" />} interval={null} controls={true}>
                                {product.image_urls.map((url, index) => (
                                    <Carousel.Item key={index}>
                                        <img src={url} alt={`${product.name} ${index}`} style={{ width: "100px", margin: "5px" }} className="d-block w-100" />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                        <div className="col-sm-6">
                            <div className="product-desc">
                                {/* Product Name */}
                                <h3>{product.name || 'Loading product name...'}</h3>
                                {/* Product Price */}
                                <p className="price">
                                    <span>{product.price ? `$${product.price}` : 'Loading price...'}</span>
                                </p>
                                {/* Product Description */}
                                <p>{product.description || 'Loading description...'}</p>
                                {/* Size Selection */}
                                <div className="size-wrap">
                                    <div className="block-26 mb-2">
                                        <h4>Size</h4>
                                        <ul>
                                            {size.length > 0 ? (
                                                size.map((size) => (
                                                    <li key={size}>
                                                        <a
                                                            href="#"
                                                            onClick={() => handleSizeSelection(size)}
                                                            className={`size-filter  ${selectedSize === size ? "selected" : ""}`}>
                                                            {size}
                                                        </a>
                                                    </li>
                                                ))
                                            ) : (
                                               
                                                    <p>Loading sizes...</p>
                                                
                                            )}
                                        </ul>
                                    </div>
                                    {/* Width Selection */}
                                    {/* <div className="block-26 mb-4">
                                        <h4>Width</h4>
                                        <ul>
                                            {['M', 'W'].map((width) => (
                                                <li key={width}>
                                                    <a
                                                        href="#"
                                                        onClick={() => handleWidthSelection(width)}
                                                        className={selectedWidth === width ? 'selected' : ''}
                                                    >
                                                        {width}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div> */}
                                </div>

                                {/* Quantity Selection */}
                                <div className="input-group mb-4">
                                    <span className="input-group-btn">
                                        <button
                                            type="button"
                                            className="quantity-left-minus btn"
                                            onClick={decrementQuantity}
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                    </span>
                                    <input
                                        type="text"
                                        id="quantity"
                                        name="quantity"
                                        className="form-control input-number"
                                        value={quantity}
                                        readOnly
                                    />
                                    <span className="input-group-btn ml-1">
                                        <button
                                            type="button"
                                            className="quantity-right-plus btn"
                                            onClick={incrementQuantity}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </span>
                                </div>

                                {/* Add to Cart Button */}
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <p className="addtocart">
                                            <button onClick={handleAddToCart} className="btn btn-primary btn-addtocart">
                                                <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
