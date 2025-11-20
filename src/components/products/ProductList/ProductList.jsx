import React, { useEffect, useState } from "react";
import productService from "../../../services/productService";
import ProductCard from "../ProductCard";
// import LoadingSkeleton from "../../common/LoadingSkeleton";
import "./ProductList.css";
import SearchBar from "../../common/SearchBar";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  // Call API
  const fetchProducts = async () => {
    try {
      console.log("Fetching products...");
      setLoading(true);
      setError(null);

      const data = await productService.getAllProducts();
      console.log("Products fetched:", data.length);

      // Update state
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    const title = product.title.toLowerCase();

    return title.includes(query);
    // "apple macbook pro".includes("laptop") → false
    // "Gaming Laptop".includes("laptop") → true
  });

  const handleSearchChange = (value) => {
    //console.log("🔍 Search query:", value);
    setSearchQuery(value);
  };

  // Loading state
  //   if (loading) {
  //     return (
  //       <div className="container">
  //         <div className="loading-container">
  //           <div className="spinner"></div>
  //           <p>Loading products...</p>
  //         </div>
  //       </div>
  //     );
  //   }

  // if (loading) {
  //   return (
  //     <div className="container">
  //       <div className="product-list-header">
  //         <h2>All Products</h2>
  //       </div>
  //       <LoadingSkeleton count={8} />
  //     </div>
  //   );
  // }

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container">
        <div className="error-container">
          <p className="error-message">❌ {error}</p>
          <button onClick={fetchProducts} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="container">
        <div className="empty-container">
          <p className="empty-message">📦 No products found</p>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="container">
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search products..."
      />

      {/* <div className="product-list-header">
        <h2>All Products ({products.length})</h2>
      </div> */}

      {/* Results Info */}
      <div className="product-list-header">
        <h2>
          {searchQuery ? (
            <>
              Search Results for "{searchQuery}"
              <span className="results-count">
                ({filteredProducts.length} of {products.length})
              </span>
            </>
          ) : (
            <>All Products ({products.length})</>
          )}
        </h2>
      </div>

      {/* Empty Search Result */}
      {filteredProducts.length === 0 ? (
        <div className="empty-container">
          <p className="empty-message">No products found for "{searchQuery}"</p>
          <button
            onClick={() => setSearchQuery("")}
            className="btn btn-primary"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              category={product.category}
              rating={product.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
