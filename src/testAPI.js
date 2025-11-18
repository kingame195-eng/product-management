import productService from './services/productService';

// Test fetch products
async function testAPI() {
  try {
    console.log('🧪 Testing API...');

    const products = await productService.getAllProducts();
    console.log('✅ Products:', products);
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testAPI();