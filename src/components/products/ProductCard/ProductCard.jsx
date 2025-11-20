import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./ProductCard.css";

function ProductCard({ id, title, price, image, category, rating }) {
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const inStock = rating.count > 0;
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" />
        <span className="product-category">{category}</span>
      </div>

      <div className="product-info">
        <h3 className="product-title">
          <Link to={`/products/${id}`}>{title}</Link>
        </h3>

        <div className="product-meta">
          <span className="product-price">{formatPrice(price)}</span>
          <div className="product-rating">
            <span className="rating-star">⭐</span>
            <span className="rating-value">{rating.rate}</span>
            <span className="rating-count">({rating.count})</span>
          </div>
        </div>

        <div className="product-stock">
          <span className={`stock-badge ${inStock ? "in-stock" : "out-stock"}`}>
            {inStock ? "✅ In Stock" : "❌ Out of Stock"}
          </span>
        </div>

        <div className="product-actions">
          <button className="btn btn-edit" title="Edit">
            ✏️ Edit
          </button>
          <button className="btn btn-delete" title="Delete">
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  rating: PropTypes.shape({
    rate: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
