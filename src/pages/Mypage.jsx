import React, { useEffect, useState } from "react";

import {
  StyledMypageWrapper,
  StyeldRightSection,
  StyledMypageSection,
  StyledPurchaseSection,
} from "../myPage/Mypage.styles";

import mockMypageData, { MockShopData } from "../myPage/MockMypageData";
import apiClient from "../token/AxiosConfig";

import Grid2 from "@mui/material/Grid2";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import MypageSideBar from "../myPage/MyPageSideBar";

const Mypage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [memberMerchList, setMemberMerchList] = useState([]);
  const [oneOnOneboardList, setoneOnOneboardList] = useState([]);
  const [dogList, setDogList] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");

  const editUser = () => {
    return (
      <>
        <>
          <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>개인정보 수정</DialogTitle>
            <DialogContent>
              <input
                type="text"
                placeholder="이메일 수정"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={(e) => e.preventDefault()} color="primary">
                이메일 중복검사
              </Button>
              <input
                type="password"
                placeholder="비밀번호 수정"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="전화번호 수정"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                placeholder="이름 수정"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="닉네임 수정"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <Button onClick={(e) => e.preventDefault()} color="primary">
                닉네임 중복검사
              </Button>
              <input
                type="text"
                placeholder="주소 수정"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                닫기
              </Button>
            </DialogActions>
          </Dialog>
        </>
      </>
    );
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const [shopData, setShopData] = useState([]);

  useEffect(() => {
    const shopMerchList = async () => {
      try {
        const response = await apiClient.get("shop/findOrderList", {
          params: { page: 1, size: 5 }, // 페이지 사이즈는 5로 너무 길지 않게
        });
        const memberMerchList = response.data || [];
        setMemberMerchList(memberMerchList);
      } catch (error) {
        // console.error("구매리스트 받아오기 실패:", error);
      }
    };

    shopMerchList(); // 비동기 함수 호출
  }, []);

  useEffect(() => {
    const apiShopData = async () => {
      const response = MockShopData;
      console.log(response.data);
      setShopData(response.data);
    };

    apiShopData();
    console.log(shopData);
  }, [shopData]);

  useEffect(() => {
    const askBoardList = async () => {
      try {
        const response = await apiClient.get("board/findAllAskMyPage", {
          params: { page: 1, size: 5 }, // 페이지 사이즈는 5로 너무 길지 않게
        });

        const oneOnOneboardList = response.data || [];
        setoneOnOneboardList(oneOnOneboardList.slice(0, 5));
      } catch (error) {
        // console.error("문의내역 받아오기 실패:", error);
      }
    };

    askBoardList(); // 비동기 함수 호출
  }, []);

  useEffect(() => {
    const dogFund = async () => {
      try {
        const response = await apiClient.get("dog/fundListMyPage");

        const dogList = response.data.dogList || [];
        setDogList(dogList.slice(0, 5));
        console.log(dogList); // 여기 콘솔 찍는거 있음. 데이터가 잘 들어왔는지 봐야지
      } catch (error) {
        console.error("펀딩내역 받아오기 실패:", error);
      }
    };

    dogFund(); // 비동기 함수 호출
  }, []);

  const handleMypage = (e) => {
    e.preventDefault();
    // 조건이 눌렸을 경우 개인정보 수정 창이 떠야한다.
  };

  const PurchaseHistory = () => {
    return (
      <Card sx={{ display: "block", borderRadius: ".5rem" }}>
        <StyledPurchaseSection>
          {/* left-section */}

          <div className="left-section flex">
            <h2 className="status">배송상태</h2>
            <img
              src="https://cdn.univ20.com/wp-content/uploads/2016/03/06df40100dc3614b1f183f7a1b4e41c1-17.png"
              className="thumbnail"
              alt="품목"
            />
            <div className="product-section align-center">
              <p className="productTitle">이름.</p>
              <span className="productPrice">가격</span>
              <span className="quntity">개수</span>
            </div>
            <button className="btn_detailed">상세정보</button>
          </div>
        </StyledPurchaseSection>
      </Card>
    );
  };

  return (
    <>
      <div className="container flex justify-center">
        <StyledMypageWrapper className="flex flex-row">
          <MypageSideBar />
          <StyeldRightSection className="right-section flex flex-column  w-full    ">
            <>
              <StyledMypageSection className="w-full">
                <Card sx={{ display: "flex", borderRadius: ".5rem" }}>
                  {/* Left Section */}

                  <Grid2
                    onClick={handleMypage}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 5,
                      backgroundColor: "#f5f5f5",
                      borderRadius: ".5rem 0 0 .5rem",
                    }}
                  >
                    <Avatar
                      src="https://static.nid.naver.com/images/web/user/default.png"
                      sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <Typography variant="h5">전세계</Typography>
                    <Typography variant="body2">Gold</Typography>
                  </Grid2>

                  {/* Right Section */}

                  <CardContent className="w-full">
                    <Typography variant="h6">Information</Typography>
                    <Divider sx={{ my: 2 }} />
                    <ul className="flex justify-around">
                      <li>
                        <h3 className="info-title">Email</h3>
                        <span>이메일 || *******처리</span>
                      </li>
                      <li>
                        <h3 className="info-title">Phone</h3>
                        <span>000-000-0000</span>
                      </li>

                      <li>
                        <h3 className="info-title">닉네임</h3>
                        <span>nickName</span>
                      </li>
                      <li>
                        <h3 className="info-title">Address</h3>
                        <span>집 주소</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </StyledMypageSection>
            </>

            <h4 className="text-left p-0 m-0">구매내역</h4>
            <PurchaseHistory />

            <div className="section-mypage flex w-full flex-column">
              <h2 className="text-left p-2">취소/반품/환불내역</h2>
              <table>
                <thead>
                  <tr>
                    <th>상품 ID</th>
                    <th>상품명</th>
                    <th>카테고리</th>
                    <th>가격</th>
                    <th>주문상태</th>
                    <th>장바구니 담기</th>
                  </tr>
                </thead>
                <tbody>
                  {mockMypageData.returnItems.map((item) => (
                    <tr key={item.shopId}>
                      <td>{item.shopId}</td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.price} 원</td>
                      <td>{item.status}</td>
                      <td>
                        <button onClick={() => alert("장바구니에 담겼습니다.")}>
                          장바구니 담기
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="section-mypage flex w-full flex-column">
              <h2 className="text-left p-2">1:1문의내역</h2>
              <table>
                <thead>
                  <tr>
                    <th>글번호</th>
                    <th>문의글 제목</th>
                    <th>작성일</th>
                    <th>작성자</th>
                  </tr>
                </thead>
                <tbody>
                  {oneOnOneboardList.map((boardDTO) => (
                    <tr key={boardDTO.boardId}>
                      <td>{boardDTO.boardId}</td>
                      <td>{boardDTO.title}</td>
                      <td>{boardDTO.regDate}</td>
                      <td>{boardDTO.memberId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="section-mypage flex w-full flex-column">
              <h2 className="text-left p-2">펀딩내역</h2>
              <table>
                <thead style={{ borderBottom: "1px solid lightOrange" }}>
                  <tr>
                    <th>펀딩 번호</th>
                    <th>유기견 번호</th>
                    {/* <th>펀딩 금액</th> */}
                  </tr>
                </thead>
                <tbody>
                  {/* {mockMypageData.fundingItems.map((fundDTO) => (
                  <tr key={fundDTO.fundId}>
                    <td>{fundDTO.fundId}</td>
                    <td>{fundDTO.dogId}</td>
                    <td>{fundDTO.amount} 원</td>
                  </tr>
                ))} */}
                  {dogList.map((fundDTO) => (
                    <tr key={fundDTO.fundId}>
                      <td>{fundDTO.fundId}</td>
                      <td>{fundDTO.dogId}</td>
                    </tr>
                  ))}
                  {/* {fund.map((fundDTO) => (
                              <tr key={fundDTO.fundId}>
                                <td>{fundDTO.fundId}</td>
                                <td>{fundDTO.dogId}</td>
                              </tr>
                              ))} */}
                </tbody>
              </table>
            </div>
          </StyeldRightSection>
        </StyledMypageWrapper>
      </div>
    </>
  );
};
export default Mypage;
