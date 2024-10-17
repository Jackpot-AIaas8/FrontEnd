import "./App.css";
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
import DogList from "./pages/DogList";
import ShopPage from "./pages/ShopPage";
import ShopDetailPage from "./pages/ShopDetailPage";

import SuccessPage from "./pages/Checkout/SuccessPage";
import FailPage from "./pages/Checkout/FailPage";

import { Routes, Route, useLocation } from "react-router-dom";

import "./config/Utility.css";
import SignIn from "./pages/SignIn";
import Button from "./components/Button";
import SignUp from "./pages/SignUp";
import AuctionMain from "./pages/Auction/AuctionMain";
import Auction from "./pages/Auction/Auction";

import { AuthContext } from "./token/AuthContext";
import Mypage from "./pages/Mypage";

import { useContext, useEffect } from "react";
import ProtectedRoute from "./token/ProtectedRoute";
import AdminRoutes from "./admin/routes/Router";
// import PaymentCheckoutPage from "./pages/Checkout/PaymentCheckoutPage";

import CheckoutPage from "./pages/Checkout/CheckoutPage";
import GlobalLoading from "./config/GlobalLoading";
import {
  setupInterceptors,
  setupNoTokenInterceptors,
} from "./token/AxiosConfig";
import { useLoading } from "./config/LodingContext";

function App() {
  const { isAdmin } = useContext(AuthContext) || {};
  const { setLoading } = useLoading();
  const location = useLocation();
  const hideNavAndHeader = location.pathname === "/admin";
  // axios 초기 설정 선언
  useEffect(() => {
    setupInterceptors(setLoading);
    setupNoTokenInterceptors(setLoading); // 인터셉터 초기화
  }, [setLoading]);

  return (
    <>
      {/* 로그인 전역 상태 관리 */}
      <div className="App">
        <GlobalLoading />
        {!isAdmin && <NavBar />}

        <Routes>
          {/* 메인 Page  */}
          <Route path="/" element={<Main />} />

          {/* 쇼핑몰Page */}
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:shopId" element={<ShopDetailPage />} />
          <Route path="/cart" element={<Cart />} />
          {/* 결제 Page */}
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/fail" element={<FailPage />} />
          {/* 강아지 사이트 */}
          <Route path="/dogList" element={<DogList />} />
          <Route path="/dog/:dogId" element={<DogDetail />} />
          {/* 게시판 사이트  */}
          <Route path="/freeBoard" element={<FreeBoardPage />} />
          <Route path="/oneOnOneBoard" element={<OneOnOneBoardPage />} />
          <Route path="/board/register" element={<BoardRegister />} />
          <Route path="/board/edit/:boardId" element={<BoardEdit />} />
          <Route path="/board/remove/:boardId" element={<BoardRemove />} />
          {/* 회원관리 */}
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />

          {/* 회원 전용 route가 될예정이오니 여기 내부에 pageroute넣어주세요 */}
          <Route element={<ProtectedRoute allowedRoles={["ROLE_USER"]} />}>
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/Checkout" element={<CheckoutPage />} />
            <Route path="/board/:boardId" element={<BoardFindOnePage />} />
          </Route>
          {/* 회원 전용 route가 될예정이오니 여기 내부에 pageroute넣어주세요 */}
          <Route path="/auction" element={<AuctionMain />} />
          <Route element={<ProtectedRoute allowedRoles={["ROLE_PREMIUM"]} />}>
               <Route path="/auction/bid" element={<Auction />} />
            </Route>
        </Routes>

        {!isAdmin && <Button />}
        {!isAdmin && <Footer />}
      </div>
      <Routes>
        <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
