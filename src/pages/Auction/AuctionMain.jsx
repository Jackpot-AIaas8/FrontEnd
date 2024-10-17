import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../../components/Shop/SideBar";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import AuctionCarousel from "../../components/Auction/AuctionCarousel";
import Button from "../../components/Auction/AuctionButton";
import apiClient from "../../token/AxiosConfig";
import AuctionWebSocket from "../../config/AuctionWebSocket";  // WebSocket 컴포넌트

const AuctionMain = () => {
  const [auction, setAuction] = useState(null);
  const [remainingTime, setRemainingTime] = useState("");
  const [status, setStatus] = useState(0); // 0: 대기, 1: 진행 중, 2: 종료

  // 경매 상태 업데이트 API 호출
  const updateAuctionStatus = (auctionId, status) => {
    apiClient
      .post(`/auction/edit`, { auctionId, auctionStatus: status })
      .then(() => {
        if (status === 2) {
          fetchCurrentAuction();  // 경매 종료 시 다음 경매 데이터를 가져옴
        }
      })
      .catch((err) => {
        console.error("경매 상태 변경 실패:", err);
      });
  };

  // 남은 시간 계산 함수
  const calculateRemainingTime = useCallback((startTime, auctionId) => {
    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(startTime);
      const diff = start - now;

      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setRemainingTime(`${hours}시간 ${minutes}분 ${seconds}초`);
      } else {
        setRemainingTime("경매 진행중");
        clearInterval(interval);
        if (auction?.auctionStatus === 0) {
          updateAuctionStatus(auctionId, 1);  // 경매 상태를 1로 업데이트 (진행 중)
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [auction?.auctionStatus]);

  const fetchCurrentAuction = useCallback(() => {
    apiClient
      .get(`/auction/current`)  // 하나의 엔드포인트로 현재 또는 다음 경매를 가져옴
      .then((res) => {
        const auctionData = res.data;
        setAuction(auctionData);  // 경매 데이터 설정
        setStatus(auctionData.auctionStatus);  // 경매 상태 설정
  
        // 남은 시간 계산 (진행 중인 경매 또는 다음 경매)
        calculateRemainingTime(auctionData.startTime, auctionData.auctionId);
      })
      .catch((err) => {
        console.error("현재 경매 정보 가져오기 실패:", err);
      });
  }, [calculateRemainingTime]);
  
  // useEffect에서 fetchCurrentAuction을 사용
  useEffect(() => {
    fetchCurrentAuction();  // 페이지 로드 시 현재 또는 다음 경매 데이터를 가져옴
  }, [fetchCurrentAuction]);
  
  // WebSocket으로부터 경매 업데이트 받기
  const handleAuctionUpdate = useCallback(
    (data) => {
      setAuction(data); // WebSocket에서 받은 경매 데이터를 상태로 업데이트
      setStatus(data.auctionStatus);
      // calculateRemainingTime(data.startTime, data.auctionId);

      if (data.auctionStatus === 2) {
        // 경매가 종료되었을 때 다음 경매 데이터를 가져옴
        fetchCurrentAuction(); // 현재 또는 다음 경매 데이터를 가져오는 함수
      }
    },
    [fetchCurrentAuction]
  );
  useEffect(() => {
    fetchCurrentAuction();  // 처음 로드할 때 현재 경매 데이터를 가져옴
  }, [fetchCurrentAuction]);

  useEffect(() => {
    if (auction && auction.auctionStatus === 1) {
      console.log("경매 진행 중입니다.");
    }
  }, [auction]);

  useEffect(() => {
    if (auction) {
      console.log('Auction data updated:', auction);
    }
  }, [auction]);  

  if (!auction) {
    return <div>경매 정보를 불러오는 중...</div>;
  }

  return (
    <>
      <Container style={{ marginTop: "200px" }}>
        <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={7} style={{ height: "400px" }}>
            <AuctionCarousel />
          </Grid>
          <Grid size={5}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "35px",
                    fontWeight: "bold",
                  }}
                >
                  {remainingTime}
                </div>
              </Grid>
              <Grid size={12} style={{ marginTop: "30px" }}>
                <div>
                  <strong style={{ fontSize: "30px", fontWeight: "20px" }}>
                    {auction.shopName}
                  </strong>
                  <span style={{ marginLeft: "8px" }}>Jackpot사 제품</span>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={12} style={{ marginTop: "50px" }}>
                <p style={{ fontsize: "15px" }}>{auction.shopDetail}</p>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={6} style={{ marginTop: "50px" }}>
                <p>경매 시작가</p>
              </Grid>
              <Grid size={6} style={{ marginTop: "50px" }}>
                <p>상품 가격</p>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={6}>
                <strong>{auction.startPrice}원</strong>
              </Grid>
              <Grid size={6}>
                <strong>{auction.shopPrice}원</strong>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={6} style={{ height: "40px" }}>
            <Button text="뒤로가기" />
          </Grid>
          <Grid size={6}>
            <Button text="입장하기" />
          </Grid>
          <Grid size={12}>
            <strong style={{ fontSize: "20px" }}>
              경매장은 VIP이상의 회원만 입장 가능합니다.
            </strong>
          </Grid>
        </Grid>
      </Container>
      <Sidebar />
      {/* WebSocket 이벤트 리스너 설정 */}
      <AuctionWebSocket onAuctionUpdate={handleAuctionUpdate} />
    </>
  );
};

export default AuctionMain;