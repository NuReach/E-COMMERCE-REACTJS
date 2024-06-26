import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
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
import { Store } from "./utils/Store"
import { useContext } from "react"
import Dashboard from "./pages/Admin/Dashboard"
import ProductListPage from "./pages/Admin/ProductListPage"
import ProductEditePage from "./pages/Admin/ProductEditePage"
import ProductCreatePage from "./pages/Admin/ProductCreatePage"
import AdminOrderListPage from "./pages/Admin/AdminOrderListPage"
import UserListPage from "./pages/Admin/UserListPage"
import UserEditPage from "./pages/Admin/UserEditPage"

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <Toaster position="bottom-left" />
    <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRouter />}>
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/placeOrder" element={<PlaceOrderPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
            <Route path="/orders" element={<OrdersListPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route element={<AdminProtectedRouter />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/create" element={<ProductCreatePage />} />
            <Route path="/products/edite/:id" element={<ProductEditePage />} />
            <Route path="/allOrders" element={<AdminOrderListPage />} />
            <Route path="/allUsers" element={<UserListPage />} />
            <Route path="/allUsers/edit/:id" element={<UserEditPage />} />
          </Route>
          
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/products/cart" element={<CartPage />} />
          <Route path="/search/result" element={<SearchResultPage />} />
        </Routes> 
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App ;


export const ProtectedRouter = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  return userInfo ? <Outlet /> : <Navigate to='/signin' />
}


export const AdminProtectedRouter = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  return userInfo?.isAdmin ? <Outlet /> : <Navigate to='/signin' />
}