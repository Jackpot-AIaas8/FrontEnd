import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/Main/NavBar";
import Sidebar from "../components/Shop/SideBar";
import ProductInfo from "../components/Shop/ShopDetail/ProductInfo"; // 수정된 ProductInfo 파일 경로
import { Container } from "@mui/material"; // MUI의 Container 사용
import ProductDetail from "../components/Shop/ShopDetail/ProductDetail";


const ShopDetailPage = () => {
  const { shopId } = useParams(); // URL에서 shopId를 추출
  const [loading, setLoading] = useState(true); // 로딩 상태 저장

  useEffect(() => {
    setLoading(false); // 로딩 상태를 false로 설정
  }, []);

  if (loading) {
    return null; // 로딩 중일 때 표시
  }

  return (
    <Container className="container flex flex-column">
      <NavBar />
      <Sidebar />
      {/* 수정된 ProductInfo 컴포넌트에 shopId 전달 */}
      <ProductInfo 
       productId={shopId} 
     />
      {/* 여기에서 추가적으로 상세 정보를 다른 JSX 파일에서 가져와 표시 */}
      <ProductDetail/>
    </Container>
  );
};

export default ShopDetailPage;
