import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import ProductPage from "./pages/ProductPage"
import CartPage from "./pages/CartPage"
import SigninPage from "./pages/SigninPage"
import RegisterPage from "./pages/RegisterPage"
import { Toaster } from "sonner"
import ShippingPage from "./pages/ShippingPage"
import PaymentPage from "./pages/PaymentPage"
import PlaceOrderPage from "./pages/PlaceOrderPage"
import OrderDetailPage from "./pages/OrderDetailPage"
import OrdersListPage from "./pages/OrdersListPage"
import ProfilePage from "./pages/ProfilePage"
import SearchResultPage from "./pages/SearchResultPage"

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <Toaster position="bottom-left" />
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/products/cart" element={<CartPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/placeOrder" element={<PlaceOrderPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
          <Route path="/orders" element={<OrdersListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search/result" element={<SearchResultPage />} />
        </Routes> 
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
