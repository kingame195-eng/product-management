import { useEffect } from "react";
import productService from "./services/productService";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import "./App.css";
import TestPage from "./pages/TestPage";
import HomePage from "./pages/HomePage";

// function HomePage() {
//   return (
//     <div className="page">
//       <h1>Home Page</h1>
//     </div>
//   );
// }

function ProductsPage() {
  return (
    <div className="page">
      <h1>Products Page</h1>
    </div>
  );
}

function AddProductPage() {
  return (
    <div className="page">
      <h1>Add Product Page</h1>
    </div>
  );
}

function App() {
  useEffect(() => {
    // Test API khi component mount
    async function fetchProducts() {
      try {
        const products = await productService.getAllProducts();
        console.log("✅ Products:", products);
      } catch (error) {
        console.error("❌ Error:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <Router>
      <div className="app">
        {/* Header hiển thị ở mọi trang */}
        <Header />

        {/* Main content - Thay đổi theo route */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
