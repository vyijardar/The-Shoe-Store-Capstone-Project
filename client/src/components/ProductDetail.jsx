import { useEffect, useState ,useContext} from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate for navigation
import Breadcrumbs from './BreadCrumbs';
import { CartContext } from '../context/CartContext';

export default function ProductDetail({setCartCount }) {
    const { id } = useParams();
    const navigate = useNavigate(); // useNavigate hook for programmatic navigation

    // Initialize all states upfront
    const [product, setProduct] = useState(null); 
    const [currentSlide, setCurrentSlide] = useState(0);
    const [quantity, setQuantity] = useState(1); // Added state for quantity
    const [selectedSize, setSelectedSize] = useState(null); // Added state for selected size
    const [selectedWidth, setSelectedWidth] = useState(null); // Added state for selected width
    // State for the cart
    const [cart, setCart] = useState(() => {
        // Retrieve cart from localStorage on initial load (if any)
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
     const { addToCart } = useContext(CartContext);
    const images = [
        './src/assets/images/item-1.jpg',
        './src/assets/images/item-2.jpg',
        './src/assets/images/item-3.jpg',
        './src/assets/images/item-4.jpg'
    ];

    // Function to move to the next slide
    function nextSlide() {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }
    // Function to move to the previous slide
    function prevSlide() {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
    }
    // Handle quantity increment and decrement
    function incrementQuantity() {
        setQuantity((prevQuantity) => prevQuantity + 1);
    }
    function decrementQuantity() {
        if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1);
    }
    // Handle size and width selection
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

        // Calculate the new cart count and update the state
        const totalQuantity = savedCart.reduce((acc, item) => acc + item.quantity, 0);
        setCartCount(totalQuantity);

        alert(`Added ${quantity} item(s) of "${product.title}" to the cart.`);
        addToCart({ ...product, quantity: 1 })
    }
    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${id}`);
                const result = await response.json();
                setProduct(result);       
            } catch (error) {
                console.error(error);
            }
        }
        fetchProduct();
    }, [id]);


    // Optionally, you can add automatic slide change
    useEffect(() => {
        const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

     // Get cart count from localStorage on component mount
     useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalQuantity = savedCart.reduce((acc, item) => acc + item.quantity, 0);
        setCartCount(totalQuantity);
    }, []);

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
                        <div className="col-sm-8">
                            <div className="owl-carousel">
                                <div className="item">
                                 <div className="product-entry border" key={product.id}>
                                        <img src={product.image_url} className="img-fluid" alt={product.name}  />
                                          {/* <img
                                            src={product.image[currentSlide]}
                                            alt={` ${product.title} ${currentSlide + 1}`}
                                            className="img-fluid"
                                            onClick={() => navigate(`/${product.id}`)}
                                        /> */}
                                    </div> 
                                </div>
                                        
                                {/* Navigation buttons */}
                                <button onClick={prevSlide} className="prev-button">
                                    &#10094;
                                </button>
                                <button onClick={nextSlide} className="next-button">
                                    &#10095;
                                </button>
                            </div>
                          
                        </div>
                        <div className="col-sm-4">
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
                                            <i className="icon-minus2"></i>
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
                                            <i className="icon-plus2"></i>
                                        </button>
                                    </span>
                                </div>

                                {/* Add to Cart Button */}
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <p className="addtocart">
                                            <button onClick={handleAddToCart} className="btn btn-primary btn-addtocart">
                                                <i className="icon-shopping-cart"></i> Add to Cart
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
