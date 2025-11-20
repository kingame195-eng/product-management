import React from "react";
import ProductList from "../components/products/ProductList";

function HomePage() {
  return (
    <div className="home-page">
      <div className="container">
        <div className="page-header">
          <h1>Welcome to Product Management</h1>
          <p className="page-subtitle">Browse and manage your products</p>
        </div>

        <ProductList />
      </div>
    </div>
  );
}

export default HomePage;
