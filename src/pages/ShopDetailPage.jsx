// ShopDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/Main/NavBar";
import Sidebar from "../components/Shop/SideBar";
import { Container } from "@mui/material";
import ProductDetail from "../components/Shop/ShopDetail/ProductDetail";
import ProductInfo from "../components/Shop/ShopDetail/ProductInfo";

const ShopDetailPage = () => {
  const { shopId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Extracted shopId from URL: ", shopId);
    setLoading(false);
  }, [shopId]);

  if (loading) {
    return null;
  }

  return (
    <Container className="container flex flex-column">
      <NavBar />
      <Sidebar />
      <ProductInfo shopId={shopId}/>
      {/* ProductDetail에만 shopId를 전달하여 상품 정보를 표시 */}
      <ProductDetail shopId={shopId} /> 
    </Container>
  );
};

export default ShopDetailPage;
