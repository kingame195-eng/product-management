import React from "react";
import "./LoadingSkeleton.css";

function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="product-grid">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-title short"></div>
            <div className="skeleton-price"></div>
            <div className="skeleton-buttons">
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
