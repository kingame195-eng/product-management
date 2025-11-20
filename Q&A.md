# 🎓 **TRẢ LỜI CÁC CÂU HỎI THẦY GIÁO - PRODUCT MANAGEMENT PROJECT**

## 📚 **KIẾN THỨC CƠ BẢN**

### **🔤 React Fundamentals**

**1. Em giải thích useEffect trong ProductList.jsx hoạt động như thế nào?**

- useEffect với dependency array rỗng [] chạy một lần sau khi component mount
- Gọi fetchProducts() để load dữ liệu từ API
- Cleanup function không cần thiết vì không có subscription hay timer

**2. Tại sao phải sử dụng useState thay vì biến thường để lưu products?**

- useState tạo reactive state, khi state thay đổi component sẽ re-render
- Biến thường không trigger re-render khi giá trị thay đổi
- useState đảm bảo UI sync với data state

**3. Props drilling là gì? Em có thấy vấn đề này trong project không?**

- Props drilling là truyền props qua nhiều cấp component mà component trung gian không sử dụng
- Project hiện tại không có props drilling vì mỗi component tự fetch data hoặc nhận props trực tiếp

**4. Dependency array [] trong useEffect có ý nghĩa gì?**

- Array rỗng [] có nghĩa effect chỉ chạy một lần sau mount
- Tương đương componentDidMount trong class component
- Không có dependencies để watch for changes

### **🛣️ React Router**

**5. Em giải thích cơ chế routing trong App.js?**

- BrowserRouter wrap toàn bộ app để enable routing
- Routes container chứa tất cả route definitions
- Route component map URL path với React component tương ứng

**6. Nếu user nhập URL /products/123, làm sao để hiển thị chi tiết sản phẩm?**

- Cần thêm Route với path="/products/:id" trong Routes
- Sử dụng useParams hook để lấy id từ URL
- Fetch product detail bằng productService.getProductById(id)

**7. BrowserRouter khác HashRouter như thế nào?**

- BrowserRouter sử dụng HTML5 History API, URL clean không có #
- HashRouter sử dụng URL hash, tương thích browser cũ hơn
- BrowserRouter cần server config cho client-side routing

### **🌐 API Integration**

**8. Em giải thích flow từ khi click refresh đến khi hiển thị data?**

- User click refresh → fetchProducts() được gọi
- setLoading(true) → hiển thị LoadingSkeleton
- productService.getAllProducts() → api.get('/products')
- Axios interceptor log request → gọi FakeStoreAPI
- Response trả về → interceptor log response
- setProducts(data) → setLoading(false) → render ProductCard grid

**9. Interceptors trong axios.js có tác dụng gì?**

- Request interceptor: log requests, thêm authentication headers
- Response interceptor: log responses, handle global errors
- Centralized request/response processing

**10. Nếu API trả về 500 error, user sẽ thấy gì?**

- Axios response interceptor catch error
- Error được throw về ProductList
- catch block trong fetchProducts set error state
- User thấy error message và "Try Again" button

## 💡 **PHÂN TÍCH THIẾT KẾ**

### **🏗️ Architecture Questions**

**11. Tại sao em tách ProductCard thành component riêng?**

- Reusability: có thể dùng ở nhiều nơi (ProductList, TestPage)
- Single Responsibility: chỉ lo render một product card
- Maintainability: dễ debug và update UI
- Testability: test riêng biệt từng component

**12. Em có thấy vi phạm Single Responsibility Principle ở đâu không?**

- ProductList component handle cả API fetching và UI rendering
- Nên tách thành useProducts hook cho data logic và ProductList cho UI
- App.js vừa routing vừa API initialization

**13. Folder structure này có ưu nhược điểm gì?**

- Ưu điểm: feature-based organization, clear separation
- Nhược điểm: có thể phức tạp khi project lớn, missing shared utilities folder

**14. Nếu project có 100 components, em sẽ tổ chức folder như thế nào?**

- Group by feature thay vì by type
- Tạo shared/common folder cho reusable components
- Sử dụng index.js files cho clean imports
- Atomic design methodology (atoms, molecules, organisms)

### **🎨 CSS Architecture**

**15. CSS Variables có lợi ích gì so với hardcode colors?**

- Consistency: đảm bảo color scheme thống nhất
- Maintainability: thay đổi một chỗ apply toàn project
- Theming: dễ dàng implement dark/light mode
- Reusability: tái sử dụng values across components

**16. Em giải thích BEM methodology và áp dụng vào project?**

- Block\_\_Element--Modifier naming convention
- Project đã áp dụng một phần với class names như product-card, product-image
- Cần consistent hơn với modifier classes

**17. Responsive design trong ProductCard hoạt động ra sao?**

- CSS media queries cho different screen sizes
- Grid layout tự động adjust columns
- Image container height responsive
- Font sizes scale down trên mobile

## 🚀 **PERFORMANCE & OPTIMIZATION**

### **⚡ Performance**

**18. LoadingSkeleton có cải thiện UX như thế nào?**

- Perceived performance: user thấy content đang load
- Reduce layout shift: maintain layout structure
- Visual feedback thay vì blank screen
- Smooth transition từ loading sang real content

**19. Nếu có 1000 products, rendering sẽ bị chậm không? Giải pháp?**

- Có, DOM quá nhiều elements sẽ chậm
- Giải pháp: React.memo cho ProductCard, virtualization, pagination
- Lazy loading, infinite scroll
- Server-side filtering và pagination

**20. React.memo có nên dùng cho ProductCard không? Tại sao?**

- Có, vì ProductCard nhận nhiều props và render frequently
- Prevent unnecessary re-renders khi parent re-render
- Nhưng cần measure performance trước khi optimize

**21. Code splitting là gì? Khi nào cần áp dụng?**

- Chia code thành chunks nhỏ, load theo demand
- Áp dụng khi bundle size lớn, có route-based splitting
- React.lazy và Suspense cho dynamic imports

### **🔍 Error Handling**

**22. Nếu image product load fail, em sẽ handle như thế nào?**

- onError event handler cho img tag
- Fallback placeholder image
- Loading state cho images
- Retry mechanism nếu cần

**23. Network timeout sẽ được xử lý ở đâu?**

- Axios config có timeout: 10000ms
- Interceptor catch timeout errors
- ProductList catch và display error message

**24. Error boundaries có cần thiết trong project này không?**

- Có, để catch JavaScript errors trong component tree
- Prevent white screen of death
- Graceful fallback UI cho users

## 🧪 **TESTING & DEBUGGING**

### **🔧 Testing**

**25. Em sẽ viết unit test cho ProductCard như thế nào?**

- Test rendering với props đầy đủ
- Test price formatting function
- Test stock badge display logic
- Test button click handlers
- Snapshot testing cho UI consistency

**26. Integration test cho ProductList cần test những gì?**

- API call integration với productService
- Loading states transitions
- Error handling flows
- Data display sau khi fetch success

**27. Mocking API calls trong test có cần thiết không?**

- Có, để test không phụ thuộc external services
- Faster test execution
- Predictable test results
- Test different response scenarios

### **🐛 Debugging**

**28. Nếu ProductList render nhưng không có data, em debug thế nào?**

- Check network tab cho API calls
- Console.log trong fetchProducts function
- Verify API response structure
- Check state updates trong useState

**29. React DevTools sẽ giúp gì trong việc debug?**

- Inspect component tree và props
- Monitor state changes
- Profiler cho performance analysis
- Components tab cho hierarchy visualization

**30. Console.log có nên commit lên production không?**

- Không, nên remove trước production
- Sử dụng proper logging libraries
- Environment-based logging levels

## 🎯 **ADVANCED CONCEPTS**

### **🔄 State Management**

**31. Khi nào nên dùng Context thay vì props drilling?**

- Khi có data cần share across nhiều components
- Authentication state, theme settings
- Khi props drilling qua 3+ levels

**32. useReducer vs useState - khi nào dùng cái nào?**

- useState cho simple state
- useReducer cho complex state logic, multiple related state updates
- useReducer khi có complex state transitions

**33. Redux có cần thiết cho project này không?**

- Chưa cần thiết vì state đơn giản
- Cân nhắc khi có complex global state
- Shopping cart, user management features

### **🔐 Security**

**34. XSS attack có thể xảy ra ở đâu trong project?**

- Render product title, description từ API
- React tự escape content nhưng cần careful với dangerouslySetInnerHTML
- Validate và sanitize user inputs

**35. Validate data từ API có cần thiết không?**

- Có, không trust external data
- PropTypes đã implement một phần
- Runtime validation với libraries như Yup, Joi

**36. HTTPS vs HTTP - ảnh hưởng gì đến security?**

- HTTPS encrypt data transmission
- Prevent man-in-the-middle attacks
- Required cho production deployment

## 📈 **SCALABILITY & FUTURE**

### **🏢 Production Ready**

**37. Em sẽ deploy project này như thế nào?**

- Build production bundle với npm run build
- Deploy static files lên CDN/hosting service
- Configure server cho client-side routing
- Environment variables cho API URLs

**38. Environment variables cần setup những gì?**

- API base URL cho different environments
- Feature flags, analytics keys
- Build configuration settings

**39. CI/CD pipeline cho project React gồm những bước nào?**

- Source code checkout
- Install dependencies
- Run tests và linting
- Build production bundle
- Deploy to hosting service
- Health checks

### **📊 Monitoring**

**40. Làm sao track user behavior trên website?**

- Google Analytics, event tracking
- User session recordings
- Heat maps cho user interactions
- Custom analytics cho business metrics

**41. Performance monitoring cần theo dõi metrics nào?**

- Core Web Vitals (LCP, FID, CLS)
- Bundle size, load times
- API response times
- Error rates và crash reports

**42. Error logging và crash reporting setup ra sao?**

- Sentry, LogRocket cho error tracking
- Centralized logging system
- Alerting cho critical errors

## 🎭 **SCENARIO QUESTIONS**

### **🚨 Tình huống thực tế**

**43. Nếu PM yêu cầu thêm search functionality, em sẽ implement ở đâu?**

- SearchBar component trong Header
- Search state trong ProductList hoặc Context
- Filter products array based on search term
- Debounce search input cho performance

**44. User complain trang load chậm, em sẽ investigate như thế nào?**

- Check bundle size và optimize
- Analyze network requests
- Implement code splitting
- Optimize images và assets
- Measure với Lighthouse

**45. Nếu API thay đổi response format, em cần sửa những file nào?**

- productService.js cho data transformation
- ProductCard component nếu props structure thay đổi
- PropTypes definitions
- TypeScript interfaces nếu có

### **🔄 Refactoring**

**46. Em sẽ refactor ProductList để support infinite scroll?**

- Implement useInfiniteScroll custom hook
- Track loading state cho next page
- Concatenate new products với existing list
- Intersection Observer API cho scroll detection

**47. Thêm filter by category vào ProductList như thế nào?**

- Category filter component
- Filter state management
- Filter products array before rendering
- Update URL params cho shareable filters

**48. Convert project từ class components sang functional components cần lưu ý gì?**

- Project đã là functional components
- useState thay cho this.state
- useEffect thay cho lifecycle methods
- Custom hooks cho reusable logic

## 🎯 **CODE REVIEW QUESTIONS**

### **📝 Code Quality**

**49. Em có thấy code smell nào trong project không?**

- Large ProductList component (God component)
- Commented out code nên remove
- Console.log statements trong production code

**50. Naming conventions có consistent không?**

- Camel case cho variables, functions
- Pascal case cho components
- Kebab case cho CSS classes
- Mostly consistent, có thể improve

**51. Comments có đủ và cần thiết không?**

- JSDoc comments cho functions sẽ tốt hơn
- Complex logic cần explain
- Remove obvious comments

### **🛡️ Best Practices**

**52. PropTypes có cần thiết trong era TypeScript không?**

- TypeScript provide better type safety
- PropTypes still useful cho runtime validation
- Migration strategy từ PropTypes sang TypeScript

**53. Key prop trong map function có quan trọng không?**

- Rất quan trọng cho React reconciliation
- Improve performance khi list thay đổi
- Prevent rendering bugs

**54. Accessibility (a11y) có được implement đầy đủ không?**

- Missing alt texts, ARIA labels
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

## 🏆 **BONUS ADVANCED**

### **🤖 Modern React**

**55. React 18 Concurrent Features có áp dụng được không?**

- Suspense cho data fetching
- Concurrent rendering cho better UX
- useTransition cho non-urgent updates

**56. Suspense và ErrorBoundary kết hợp ra sao?**

- Suspense handle loading states
- ErrorBoundary catch rendering errors
- Nested structure cho granular control

**57. Server Components vs Client Components - khi nào dùng?**

- Server Components cho static content
- Client Components cho interactive features
- Hybrid approach cho optimal performance

### **🔮 Future Tech**

**58. Next.js có lợi thế gì so với CRA?**

- Server-side rendering, static generation
- Built-in routing, API routes
- Image optimization, automatic code splitting
- Better SEO và performance

**59. TypeScript migration strategy cho project này?**

- Install TypeScript dependencies
- Rename .js files thành .tsx
- Add type definitions gradually
- Strict mode configuration

**60. Micro-frontends có phù hợp không?**

- Overkill cho project này
- Suitable cho large teams, complex domains
- Module federation với Webpack 5

---

## 📋 **TỔNG KẾT**

Đây là 60 câu hỏi và câu trả lời về Product Management project, covering từ React fundamentals đến advanced concepts. Các câu hỏi được phân loại theo từng level từ junior đến senior developer.

**Mục đích:** Đánh giá toàn diện kiến thức React, architecture design, best practices và problem-solving skills của developer.
