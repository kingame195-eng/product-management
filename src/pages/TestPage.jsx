import React from "react";
import ProductCard from "../components/products/ProductCard";

function TestPage() {
  const testProduct = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    category: "men's clothing",
    rating: {
      rate: 3.9,
      count: 120,
    },
    };  
    
  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1>Test ProductCard</h1>

      <div style={{ maxWidth: "300px" }}>
        <ProductCard
          id={testProduct.id}
          title={testProduct.title}
          price={testProduct.price}
          image={testProduct.image}
          category={testProduct.category}
          rating={testProduct.rating}
        />
      </div>
    </div>
  );
}

export default TestPage;