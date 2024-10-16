import Sidebar from "../../components/Shop/SideBar";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import AuctionCarousel from "../../components/Auction/AuctionCarousel"
import styled from "styled-components";
import Button from "../../components/Auction/AuctionButton"
import React,{useState,useEffect,useCallback} from "react";
import apiClient from "../../token/AxiosConfig";

// const AuctionMain = () => {
//   const [auction, setAuction] = useState(null);
//   const [remainingTime, setRemainingTime] = useState("");
//   const [status, setStatus] = useState(0);


// const updateAuctionStatus = useCallback((auctionId, status) => {
//   apiClient
//     .post(`/auction/edit`, { auctionId, auctionStatus: status })
//     .then(() => {
//       console.log(`경매 상태 변경 완료: ${status}`);
//       setAuction((prev) => ({ ...prev, auctionStatus: status }));
//       console.log(auction);
//       if (status === 2) {
//         fetchAuction();
//       }
//     })
//     .catch((err) => {
//       console.error("경매 상태 변경 실패:", err);
//     });
// }, []);


// const calculateRemainingTime = useCallback((startTime, auctionId) => {
//   const interval = setInterval(() => {
//     const now = new Date();
//     const start = new Date(startTime);
//     const diff = start - now;

//     if (diff > 0) {
//       const hours = Math.floor(diff / (1000 * 60 * 60));
//       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((diff % (1000 * 60)) / 1000);
//       setRemainingTime(`${hours}시간 ${minutes}분 ${seconds}초`);
//     } else {
//       setRemainingTime("경매 진행중");
//       clearInterval(interval);
//       updateAuctionStatus(auctionId, 1);
//     }
//   }, 1000);

//   return () => clearInterval(interval);
// }, [updateAuctionStatus]);


// const fetchAuction = useCallback(() => {
//   apiClient
//     .get(`/auction/auctionNext`)
//     .then((res) => {
//       setAuction(res.data);
//       setStatus(res.data.auctionStatus);
//       calculateRemainingTime(res.data.startTime, res.data.auctionId);
//     })
//     .catch((err) => {
//       console.error("경매 정보 가져오기 실패:", err);
//     });
// }, [calculateRemainingTime]);

// useEffect(() => {
//   fetchAuction();
// }, [fetchAuction, status]);

// useEffect(() => {
//   if (auction) {
//     const cleanup = calculateRemainingTime(auction.startTime, auction.auctionId);
//     return cleanup;
//   }
// }, [auction, calculateRemainingTime]);


// if (!auction) {
//   return <div>경매 정보를 불러오는 중...</div>;
// }

const AuctionMain = () => {
  const [auction, setAuction] = useState(null);
  const [remainingTime, setRemainingTime] = useState("");
  const [status, setStatus] = useState(0);  // 0: 대기, 1: 진행 중, 2: 종료

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
          updateAuctionStatus(auctionId, 1); // 경매 상태를 진행 중으로 업데이트
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [auction?.auctionStatus]);

  // 경매 상태 업데이트
  const updateAuctionStatus = useCallback((auctionId, status) => {
    console.log("edit")
    apiClient
      .post(`/auction/edit`, { auctionId, auctionStatus: status })
      .then(() => {
        if (status === 2) {
          fetchNextAuction();  // 경매 종료 시 다음 경매 데이터를 가져옴
        }
      })
      .catch((err) => {
        console.error("경매 상태 변경 실패:", err);
      });
  }, []);

  useEffect(() => {
    console.log(auction);  // auction 상태가 업데이트될 때마다 이 코드가 실행됩니다.
  }, [auction]);

  // 현재 경매 가져오기
  const fetchCurrentAuction = useCallback(() => {
    apiClient
      .get(`/auction/current`)
      .then((res) => {
        // console.log(res.data);
        setAuction(res.data);
        setStatus(res.data.auctionStatus);
        // console.log(auction);
        calculateRemainingTime(res.data.startTime, res.data.auctionId);
      })
      .catch((err) => {
        console.error("현재 경매 정보 가져오기 실패:", err);
      });
  }, [calculateRemainingTime]);

  // 다음 경매 가져오기
  const fetchNextAuction = useCallback(() => {
    console.log("next")
    apiClient
      .get(`/auction/next`)
      .then((res) => {
        setAuction(res.data);
        // console.log(auction);
        setStatus(0);  // 다음 경매는 다시 대기 상태로 설정
      })
      .catch((err) => {
        console.error("다음 경매 정보 가져오기 실패:", err);
      });
  }, []);

  useEffect(() => {
    fetchCurrentAuction();  // 페이지 로드 시 현재 경매 데이터를 먼저 가져옴
  }, []);

  useEffect(() => {
    if (auction) {
      const cleanup = calculateRemainingTime(auction.startTime, auction.auctionId);
      return cleanup;
    }
  }, [auction, calculateRemainingTime]);

  if (!auction) {
    return <div>경매 정보를 불러오는 중...</div>;
  }

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
                  <span style={{ marginLeft: "8px" }}>Jackpot사 제품</span>
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
