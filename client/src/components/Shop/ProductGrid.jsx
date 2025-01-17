import { useNavigate,Link } from 'react-router-dom';
export default function ProductGrid({ products }) {
    const navigate = useNavigate();
    return (
        <div className="row row-pb-md">
              
            {products.map(product => (
                <div className="col-md-3 col-lg-3 mb-4 text-center" key={product.id}>
                    <div className="product-entry border" >
                        <Link to={`/products/${product.id}`} className="prod-img">
                            <img src={product.image} className="img-fluid" alt={product.title} />
                        </Link> 
                        <div className="desc">
                            <h2><Link to={`/products/${product.id}`}>{product.title	}</Link></h2>
                            <span className="price">${product.price}</span>
                        </div>
                        <div className="col-sm-12 text-center">
                            <p className="addtocart">
                                <button className="btn btn-primary btn-addtocart" type="submit" onClick={() => navigate('/cart')} >
                                    <i className="icon-shopping-cart"></i> Add to Cart</button>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
