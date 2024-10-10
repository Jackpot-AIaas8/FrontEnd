import "./App.css";
// import SignUp from "./login/SignUp";
import Main from "./pages/MainPage";
import NavBar from "./components/Main/NavBar";
import Footer from "./components/Main/Footer";
import FreeBoardPage from "./pages/FreeBoardPage";
import OneOnOneBoardPage from "./pages/OneOnOneBoardPage";
import BoardFindOnePage from "./pages/BoardFindOnePage";
import BoardRegister from "./pages/BoardRegisterPage";
import BoardEdit from "./pages/BoardEditPage";
import BoardRemove from "./pages/BoardDeletePage";
import Cart from "./components/Cart";
import DogDetail from "./dogList/DogDetail";
import DogListPage from "./pages/DogListPage";
import ShopPage from "./pages/ShopPage";
import ShopDetailPage from "./pages/ShopDetailPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./config/theme";
import "./config/Utility.css";
import SignIn from "./pages/SignIn";
import Button from "./components/Button";
import SignUp from "./pages/SignUp";

import { AuthProvider, AuthContext } from "./token/AuthContext";
import Mypage from "./pages/Mypage";
import MypageDemo from "./pages/MypageDemo";
import { useContext } from "react";
import ProtectedRoute from "./token/ProtectedRoute";
import ThemeRoutes from "./admin/routes/Router";

function App() {
  const { isAdmin, userRole } = useContext(AuthContext);

  return (
    <>
      {/* 로그인 전역 상태 관리 */}
      <div className="App">
        {!isAdmin && <NavBar />}
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:shopId" element={<ShopDetailPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/dogList" element={<DogListPage />} />
            <Route path="/dog/:dogId" element={<DogDetail />} />
            <Route path="/freeBoard" element={<FreeBoardPage />} />
            <Route path="/oneOnOneBoard" element={<OneOnOneBoardPage />} />
            <Route path="/board/:boardId" element={<BoardFindOnePage />} />
            <Route path="/board/register" element={<BoardRegister />} />
            <Route path="/board/edit/:boardId" element={<BoardEdit />} />
            <Route path="/board/remove/:boardId" element={<BoardRemove />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/myPage" element={<Mypage />} />
            {/* <Route path="/myPage" element={<MypageDemo />} /> */}
            {/* 
            <Route
              path="/premium-content"
              element={
                <ProtectedRoute allowedRoles={["premium"]}>
                  경매 페이지 들어올곳
                </ProtectedRoute>
              }
            /> */}

            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                  <ThemeRoutes />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ThemeProvider>
        {!isAdmin && <Button />}
        {!isAdmin && <Footer />}
      </div>
    </>
  );
}

export default App;
