export default function ProductSort  ({ onSortChange }) {
    return (
      <div className="col-sm-12 mb-3">
        <h4>Sort By</h4>
        <select onChange={(e) => onSortChange(e.target.value)} className="form-control">
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
        </select>
      </div>
    );
  };