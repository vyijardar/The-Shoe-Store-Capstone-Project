import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate for navigation
import Breadcrumbs from './BreadCrumbs';
import { CartContext } from '../context/CartContext';
import { Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faMinus, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate(); 

    // Initialize all states upfront
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); 
    const [selectedSize, setSelectedSize] = useState(null); 
    const [selectedWidth, setSelectedWidth] = useState(null); 
    const { addToCart, cartItems  } = useContext(CartContext);

    // Handle quantity increment and decrement
    function incrementQuantity() {
        setQuantity((prevQuantity) => prevQuantity + 1);
    }
    function decrementQuantity() {
        if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1);
    }
    function handleSizeSelection(size) {
        setSelectedSize(size);
    }
    function handleWidthSelection(width) {
        setSelectedWidth(width);
    }

    function handleAddToCart() {
        if (!selectedSize || !selectedWidth) {
            alert("Please select a size and width before adding to the cart.");
            return;
        }

        const newItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity,
            selectedSize: selectedSize,
            selectedWidth: selectedWidth,
        };

        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const itemIndex = savedCart.findIndex(
            (item) =>
                item.id === newItem.id &&
                item.selectedSize === newItem.selectedSize &&
                item.selectedWidth === newItem.selectedWidth
        );

        if (itemIndex !== -1) {
            savedCart[itemIndex].quantity += quantity;
        } else {
            savedCart.push(newItem);
        }

        localStorage.setItem("cart", JSON.stringify(savedCart));

        // // Calculate the new cart count and update the state
        // const totalQuantity = savedCart.reduce((acc, item) => acc + item.quantity, 0);
        // setCartItems(totalQuantity);

        alert(`Added ${quantity} item(s) of "${product.title}" to the cart.`);
        addToCart({ ...product, quantity: 1 })
    }
    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`http://localhost:3001/api/products/${id}`);
                const result = await response.json();
                setProduct(result);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProduct();
    }, [id]);

    // // Get cart count from localStorage on component mount
    // useEffect(() => {
    //     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    //     const totalQuantity = savedCart.reduce((acc, item) => acc + item.quantity, 0);
    //     setCartItems(totalQuantity);
    // }, []);

    // The following `if` checks the product state after hook initializations
    if (!product) {
        return <p>Loading product details...</p>;
    }

    return (
        <>
            <Breadcrumbs currentPage="Product Details" />
            <div className="colorlib-product">
                <div className="container">

                    <div className="row row-pb-lg product-detail-wrap">
                        <div className="col-sm-6">
                            <Carousel prevIcon={<FontAwesomeIcon icon={ faChevronLeft} className="text-black" />} nextIcon={<FontAwesomeIcon icon={faChevronRight}  className="text-black"/>} interval={null} controls={true} >
                                {product.image_urls.map((url, index) => (<Carousel.Item key={index}>
                                    <img  src={url} alt={`${product.name} ${index}`} style={{ width: "100px", margin: "5px" }} className="d-block w-100" />
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
                                    {/* <span className="rate">
                                        ({product.rating.rate || '0'} Rating, {product.rating.count || '0'} Reviews)
                                    </span> */}
                                </p>
                                {/* Product Description */}
                                <p>{product.description || 'Loading description...'}</p>
                                {/* Size Selection */}
                                <div className="size-wrap">
                                    <div className="block-26 mb-2">
                                        <h4>Size</h4>
                                        <ul>
                                            {['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14'].map((size) => (
                                                <li key={size}>
                                                    <a
                                                        href="#"
                                                        onClick={() => handleSizeSelection(size)}
                                                        className={selectedSize === size ? 'selected' : ''}
                                                    >
                                                        {size}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* Width Selection */}
                                    <div className="block-26 mb-4">
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
                                    </div>
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
                                                <FontAwesomeIcon icon={faShoppingCart} />  Add to Cart
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
