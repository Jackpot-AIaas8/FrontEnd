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
import CheckoutPage from "./pages/CheckoutPage";
import { Routes, Route, useRoutes, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./config/theme";
import "./config/Utility.css";
import SignIn from "./pages/SignIn";
import Button from "./components/Button";
import SignUp from "./pages/SignUp";
import routes from "./admin/routes/Router";

import { AuthProvider } from "./token/AuthContext";
import Mypage from "./pages/Mypage";
import MypageDemo from "./pages/MypageDemo";

function App() {
  const routing = useRoutes(routes);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <AuthProvider>
      {isAdminRoute && <div>{routing}</div>}
      {/* 로그인 전역 상태 관리 */}
      <div className="App">
        {!isAdminRoute && <NavBar />}
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
            {/* <Route path="/myPage" element={<Mypage />} /> */}
            <Route path="/myPage" element={<MypageDemo />} />
          </Routes>
        </ThemeProvider>
        {!isAdminRoute && <Button />}
        {!isAdminRoute && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;
