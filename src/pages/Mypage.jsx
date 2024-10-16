import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../static/newLogoverticalOrange.png";
import MockMypageData from "../myPage/MockMypageData";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent, DialogActions, Button } from "@mui/material";
import MypagePwModal from "../myPage/MypagePwModal";
import {
  StyledMypageWrapper,
  StyledNavBar,
  StyledProFileArea,
  StyledMypageMenu,
  StyeldRightSection,
  StyledProfileContainer,
  StyledProfileInfo,
  StyledImage,
} from "../myPage/Mypage.styles";

import MenuItem from "../myPage/MenuItem";
import { AuthContext } from "../token/AuthContext";
import mockMypageData from "../myPage/MockMypageData";
import apiClient from "../token/AxiosConfig";
import { SERVER_URL } from "../config/Constants";

const Mypage = () => {
  const { logout, authState } = useContext(AuthContext);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [rank, setRank] = useState("브론즈");
  const [nickName, setNickName] = useState();
  // MenuItems.section
  const [currentPage, setCurrentPage] = useState("내프로필");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const menuItems = [
    { href: "#1", text: "개인정보수정", onClick: () => setIsDialogOpen(true) },
    { href: "/shop/findList", text: "구매 내역" },
    { href: "#3", text: "취소/ 반품 / 환불 내역" },
    { href: "#4", text: "1:1 문의 내역" },
    { href: "#5", text: "펀딩내역" },
    { href: "/signOut", text: "로그아웃", onClick: logout }, // 로그아웃 항목에 onClick 설정
  ];
  const [memberMerchList, setMemberMerchList] = useState([]);
  const [oneOnOneboardList, setoneOnOneboardList] = useState([]);
  const [dogList, setDogList] = useState([]);
  const loggedInMemberId = authState?.member?.memberId || null;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");
  const [isPasswordCheckOpen, setIsPasswordCheckOpen] = useState(false);

  const handleNavBarClick = (item) => {
    if (item.onClick) {
      setIsPasswordCheckOpen(true);
      navigate(item.href);
    }
  };

  const handlePasswordConfirm = async (password) => {
    try {
      const response = await apiClient.post("/auth/checkPassword", {
        password,
      });
      if (response.data.isValid) {
        logout();
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("비밀번호 확인 실패:", error);
    } finally {
      setIsPasswordCheckOpen(false);
    }
  };

  const handleEmailCheck = () => {
    alert("이메일 중복검사 실행");
  };

  const handleNicknameCheck = () => {
    alert("닉네임 중복검사 실행");
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const shopMerchList = async () => {
      try {
        const response = await apiClient.get("shop/findOrderList", {
          params: { page: 1, size: 5 }, // 페이지 사이즈는 5로 너무 길지 않게
        });
        const memberMerchList = response.data || [];
        setMemberMerchList(memberMerchList);
        // console.log(memberMerchList); // 여기 콘솔 찍는거 있음. 데이터가 잘 들어왔는지 봐야지
      } catch (error) {
        // console.error("구매리스트 받아오기 실패:", error);
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
        // console.log(response.data);
        const oneOnOneboardList = response.data || [];
        setoneOnOneboardList(oneOnOneboardList.slice(0, 5));
        // console.log(oneOnOneboardList); // 여기 콘솔 찍는거 있음. 데이터가 잘 들어왔는지 봐야지
      } catch (error) {
        // console.error("문의내역 받아오기 실패:", error);
      }
    };

    askBoardList(); // 비동기 함수 호출
  }, []);

  useEffect(() => {
    const dogFund = async () => {
      try {
        const response = await apiClient.get("dog/fundListMyPage", {});
        console.log(response.data);
        const dogList = response.data || [];
        setDogList(dogList.slice(0, 5));
        console.log(dogList); // 여기 콘솔 찍는거 있음. 데이터가 잘 들어왔는지 봐야지
      } catch (error) {
        console.error("펀딩내역 받아오기 실패:", error);
      }
    };

    dogFund(); // 비동기 함수 호출
  }, []);

  const handleMenuClick = (item) => {
    if (item.onClick) {
      item.onClick(); // 로그아웃 함수 호출
    } else {
      navigate(item.href); // 해당 페이지로 이동
      setCurrentPage(item.text); // 현재 페이지 상태 업데이트
    }
  };

  return (
    <>
      <div className="container flex justify-center">
        <StyledMypageWrapper className="flex flex-row">
          <StyledNavBar className="left-section flex align-center justify-center flex-column">
            <div className="section-nav h-full flex flex-column">
              <div className="logoArea flex flex-row justify-start align-center">
                <a href="/" className="logo flex">
                  <img
                    className="logo-image"
                    src={logoImage}
                    alt="로고이미지"
                    style={{ height: "50px", width: "auto" }}
                  />
                </a>
                <a href="/myPage" className="logo_title flex">
                  <h1 className="text">
                    <span className="blind">MyPage</span>
                  </h1>
                </a>
              </div>

              <StyledProFileArea className="flex flex-column w-full align-center justify-center">
                <div className="profile_inner">
                  <a href="#" className="photo">
                    <img
                      src="https://static.nid.naver.com/images/web/user/default.png"
                      alt="프로필 이미지"
                    />
                  </a>
                  <div className="profile">
                    <p className="name">{mockMypageData.member.name}</p>
                    <p className="usemail">get Email@naver.com</p>
                  </div>
                </div>
              </StyledProFileArea>
              <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>개인정보 수정</DialogTitle>
                <DialogContent>
                  <input
                    type="text"
                    placeholder="이메일 수정"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button onClick={handleEmailCheck} color="primary">
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
                  <Button onClick={handleNicknameCheck} color="primary">
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
              <StyledMypageMenu
                role="menu"
                className="flex flex-column align-start justify-center "
              >
                <ul className="menu_list flex flex-column">
                  {/* nav바 버튼 반복 */}
                  {menuItems.map((item) => (
                    <MenuItem
                      key={item.text}
                      href={item.href}
                      text={item.text}
                      isActive={currentPage === item.text}
                      onClick={() => {
                        handleNavBarClick(item);
                        handleMenuClick(item);
                      }}
                    />
                  ))}
                </ul>
              </StyledMypageMenu>
            </div>
          </StyledNavBar>
          <MypagePwModal
            open={isPasswordCheckOpen}
            onClose={() => setIsPasswordCheckOpen(false)}
            onConfirm={handlePasswordConfirm}
          />

          <StyeldRightSection className="right-section flex flex-column w-full ">
            <div className="section-mypage flex align-start justify-start w-full">
              <StyledProfileContainer className="flex flex-row justify-between w-full">
                <div className="profile-details flex align-center">
                  <a href="#2" onClick={() => alert("정보 수정")}>
                    <StyledImage className="flex w-full">
                      <img
                        src="https://static.nid.naver.com/images/web/user/default.png"
                        alt="프로필 이미지"
                      />
                    </StyledImage>
                  </a>
                  <StyledProfileInfo className="flex flex-column align-start">
                    <p>{mockMypageData.member.nickName} 님 안녕하세요.</p>
                    <p>
                      당신의 등급은{" "}
                      <span>
                        <b>{rank}</b>
                      </span>
                      입니다.
                    </p>
                  </StyledProfileInfo>
                </div>
                <div className="point-view text-center flex align-center">
                  <a href="/shop_mypage/?m2=point_list">
                    <p>누적금액</p>
                    <span>XXXX</span>
                  </a>
                </div>
              </StyledProfileContainer>
            </div>

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
