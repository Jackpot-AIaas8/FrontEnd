import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  StyledMypageWrapper,
  StyeldRightSection,
  StyledProfileContainer,
  StyledProfileInfo,
  StyledImage,
} from "../myPage/Mypage.styles";

import { AuthContext } from "../token/AuthContext";
import mockMypageData from "../myPage/MockMypageData";
import apiClient from "../token/AxiosConfig";
import { SERVER_URL } from "../config/Constants";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import MypageSideBar from "../myPage/MyPageSideBar";

import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";

export function MDBui() {
  return (
    <MDBRow className="justify-content-center align-items-center h-100 w-100">
      <MDBCol lg="6" className=" mb-lg-0 p-0 w-100">
        <MDBCard className="flex" style={{ borderRadius: ".5rem" }}>
          <MDBRow className="g-0">
            <MDBCol
              md="4"
              className="flex flex-column text-black justify-center align-center"
              style={{
                borderTopLeftRadius: ".5rem",
                borderBottomLeftRadius: ".5rem",
              }}
            >
              <MDBCardImage
                src="https://static.nid.naver.com/images/web/user/default.png"
                alt="Avatar"
                className="my-3"
                style={{ width: "80px", borderRadius: "50%" }}
                fluid
              />
              <MDBTypography tag="h5">전세계</MDBTypography>
              <MDBCardText>Gold</MDBCardText>
            </MDBCol>
            <MDBCol md="8">
              <MDBCardBody className="p-4">
                <MDBTypography tag="h6">Information</MDBTypography>
                <hr className="mt-0 mb-4" />
                <MDBRow className="pt-1">
                  <MDBCol size="6" className="mb-3">
                    <MDBTypography tag="h6">Email</MDBTypography>
                    <MDBCardText className="text-muted">
                      이메일 || *******처리
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol size="6" className="mb-3">
                    <MDBTypography tag="h6">Phone</MDBTypography>
                    <MDBCardText className="text-muted">
                      000-000-0000
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>

                <MDBTypography tag="h6">Information</MDBTypography>
                <hr className="mt-0 mb-4" />
                <MDBRow className="pt-1">
                  <MDBCol size="6" className="mb-3">
                    <MDBTypography tag="h6">닉네임</MDBTypography>
                    <MDBCardText className="text-muted">nickName</MDBCardText>
                  </MDBCol>
                  <MDBCol size="6" className="mb-3">
                    <MDBTypography tag="h6">address</MDBTypography>
                    <MDBCardText className="text-muted">집 주소</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}

const Mypage = () => {
  const { authState } = useContext(AuthContext);

  const [rank, setRank] = useState("브론즈");

  // MenuItems.section

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

  useEffect(() => {
    const shopMerchList = async () => {
      try {
        const response = await apiClient.get(`${SERVER_URL}shop/findList`, {
          params: { page: 1, size: 5 }, // 페이지 사이즈는 5로 너무 길지 않게
        });
        const memberMerchList = response.data.dtoList || [];
        setMemberMerchList(memberMerchList);
      } catch (error) {
        console.error("구매리스트 받아오기 실패:", error);
      }
    };

    shopMerchList(); // 비동기 함수 호출
  }, []);

  useEffect(() => {
    const askBoardList = async () => {
      try {
        const response = await apiClient.get(
          `${SERVER_URL}board/findAllAskMyPage`,
          {
            params: { page: 1, size: 5 }, // 페이지 사이즈는 5로 너무 길지 않게
          }
        );
        console.log(response.data);
        const oneOnOneboardList = response.data || [];
        setoneOnOneboardList(oneOnOneboardList.slice(0, 5));
        console.log(oneOnOneboardList); // 여기 콘솔 찍는거 있음. 데이터가 잘 들어왔는지 봐야지
      } catch (error) {
        console.error("문의내역 받아오기 실패:", error);
      }
    };

    askBoardList(); // 비동기 함수 호출
  }, []);

  useEffect(() => {
    const dogFund = async () => {
      try {
        const response = await apiClient.get(
          `${SERVER_URL}dog/fundListMyPage`,
          {}
        );
        console.log(response.data.dogList);
        const dogList = response.data.dogList || [];
        setDogList(dogList.slice(0, 5));
        console.log(dogList); // 여기 콘솔 찍는거 있음. 데이터가 잘 들어왔는지 봐야지
      } catch (error) {
        console.error("펀딩내역 받아오기 실패:", error);
      }
    };

    dogFund(); // 비동기 함수 호출
  }, []);

  return (
    <>
      <div className="container flex justify-center">
        <StyledMypageWrapper className="flex flex-row">
          <MypageSideBar />
          <StyeldRightSection className="right-section flex flex-column w-full  align-center justify-center ">
            <MDBui />
            <div className="section-mypage flex w-full flex-column">
              <h2 className="text-left p-2">구매내역</h2>
              <table>
                <thead>
                  <tr>
                    <th>상품 ID</th>
                    <th>상품명</th>
                    {/* <th>디테일</th> */}
                    <th>카테고리</th>
                    <th>가격</th>
                    <th>리뷰보기</th>
                    <th>장바구니 담기</th>
                  </tr>
                </thead>
                <tbody>
                  {memberMerchList.map((shopDTO) => (
                    <tr key={shopDTO.shopId}>
                      <td>{shopDTO.shopId}</td>
                      <td>{shopDTO.name}</td>
                      {/* <td>{shopDTO.detail}</td> */}
                      <td>{shopDTO.category}</td>
                      <td>{shopDTO.price}</td>
                      <td>
                        <a href={`/mypage/${shopDTO.shopId}/review`}>
                          리뷰보기
                        </a>
                      </td>
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
                    <th>펀딩 금액</th>
                  </tr>
                </thead>
                <tbody>
                  {mockMypageData.fundingItems.map((fundDTO) => (
                    <tr key={fundDTO.fundId}>
                      <td>{fundDTO.fundId}</td>
                      <td>{fundDTO.dogId}</td>
                      <td>{fundDTO.amount} 원</td>
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
