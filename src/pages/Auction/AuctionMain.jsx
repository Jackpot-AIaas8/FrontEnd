import Sidebar from "../../components/Shop/SideBar";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import AuctionCarousel from "../../components/Auction/AuctionCarousel"
import styled from "styled-components";
import Button from "../../components/Auction/AuctionButton"
import React,{useState,useEffect} from "react";
import apiClient from "../../token/AxiosConfig";

const AuctionMain = () => {
  const [auction,setAuction] = useState([]);
  const [remainingTime, setRemainingTime] = useState("");
  const [status, setStatus] = useState(0);

  // const getAuction = () => {
  //   apiClient
  //     .get(`/auction/auctionNext`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setAuction(res.data);
  //     })
  //     .catch((err) => {
  //       console.log("에러 : ", err);
  //     });
  // };

  // useEffect(() => {
  //   // 컴포넌트가 마운트될 때 처음 경매 정보를 가져옵니다.
  //   getAuction();
    
  //   const interval = setInterval(() => {
  //     // 경매 상태가 1일 경우 상태 확인
  //     if (auction && auction.status === 1) {
  //       // 경매가 진행 중일 경우 다음 경매를 체크
  //       getAuction();
  //     }
  //   }, 5000); // 5초마다 체크 (필요에 따라 시간 조정 가능)

  //   return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 정리
  // }, [auction]); // auction이 변경될 때마다 useEffect를 재실행
  
  //     calculateRemainingTime(); // 컴포넌트가 마운트될 때 한 번 계산
  //     const timer = setInterval(calculateRemainingTime, 1000); // 1초마다 남은 시간 갱신
  
  //     return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  // }, [auction.startTime]); // auction.startTime에 의존
  const fetchAuction = () => {
    apiClient
      .get(`/auction/auctionNext`)
      .then((res) => {
        setAuction(res.data);
        calculateRemainingTime(res.data.startTime, res.data.auctionId);
      })
      .catch((err) => {
        console.log("에러 : ", err);
      });
  };

  const updateAuctionStatus = (auctionId, status) => {
    apiClient
      .post(`/auction/edit`, { auctionId, auctionStatus: status })
      .then(() => {
        console.log("상태 수정 완료");
      })
      .catch((err) => {
        console.log("실패 : ", err);
      });
  };

  const calculateRemainingTime = (startTime, auctionId) => {
    const timer = setInterval(() => {
      const now = new Date();
      const startTimeDate = new Date(startTime);
      const timeDiff = startTimeDate - now;

      if (timeDiff <= 0) {
        setRemainingTime("경매 진행중!");
        updateAuctionStatus(auctionId, 1); // 경매 시작 상태로 변경
        clearInterval(timer); // 타이머 정리
      } else {
        const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
        const hours = Math.floor((timeDiff / 1000 / 60 / 60) % 24);
        const days = Math.floor(timeDiff / 1000 / 60 / 60 / 24);
        
        setRemainingTime(`${days}일 ${hours}시간 ${minutes + 1}분 뒤 시작!`);
      }

      // 경매가 끝나면 상태 업데이트
      if (auction.auctionStatus === 2) {
        fetchAuction(); // 경매 종료 상태로 변경
      }
    }, 1000); // 1초마다 갱신

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  };

  useEffect(() => {
    fetchAuction(); // 컴포넌트 마운트 시 경매 데이터 가져오기
  }, []);
  
  
  return (
    <>
      <Container style={{ marginTop: "200px" }}>
        <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={7} style={{ height: "400px" }}>
            <div>
              <AuctionCarousel />
            </div>
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
                  {"    "}Jackpot사 제품
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={12} style={{ marginTop: "50px" }}>
                <div>
                  <p style={{ fontsize: "15px" }}>{auction.shopDetail}</p>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={6} style={{ marginTop: "50px" }}>
                <div>
                  <p>경매 시작가</p>
                </div>
              </Grid>
              <Grid size={6} style={{ marginTop: "50px" }}>
                <div>
                  <p>상품 가격</p>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={6}>
                <div>
                  <strong>{auction.startPrice}원</strong>
                </div>
              </Grid>
              <Grid size={6}>
                <div>
                  <strong>{auction.shopPrice}원</strong>
                </div>
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
            <div>
              <strong style={{ fontSize: "20px" }}>
                경매장은 VIP이상의 회원만 입장 가능합니다.
              </strong>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Sidebar />
    </>
  );
};

export default AuctionMain;
