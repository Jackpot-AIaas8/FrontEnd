import React from 'react';
import styled from 'styled-components';

// 스타일드 컴포넌트 정의
const HeaderSubindex = styled.div`
  /* 스타일 정의 */
`;

const GnbArea = styled.div`
  /* 네이버 로고와 ID 스타일 */
`;

const LnbArea = styled.div`
  /* Lnb 스타일 */
`;

const ProfileArea = styled.div`
  /* 프로필 스타일 */
`;

const HeaderLeft = styled.div`
  /* 왼쪽 메뉴 스타일 */
`;

const FooterLogo = styled.div`
  /* Footer 로고 스타일 */
`;

export default function NaverHeader() {
  return (
    <HeaderSubindex>
      <GnbArea>
        <a
          href="https://www.naver.com/"
          className="logo"
          onClick={(e) => console.log('gnb.naver')}
        >
          <span className="blind">네이버</span>
        </a>
        <a
          href="/user2/help/myInfoV2?lang=ko_KR"
          className="gnb_title"
          onClick={(e) => console.log('gnb.naverID')}
        >
          <h1 className="text">
            <span className="blind">네이버ID</span>
          </h1>
        </a>
      </GnbArea>

      <LnbArea>
        <ul className="lnb_list" role="menu">
          <li>
            <a href="/user2/help/myInfoV2?m=viewProfile&amp;lang=ko_KR" className="lnb_item" role="menuitem">
              <div className="lnb_text">내프로필</div>
            </a>
          </li>
          <li>
            <a href="/user2/help/myInfoV2?m=viewSecurity&amp;lang=ko_KR" className="lnb_item" role="menuitem">
              <div className="lnb_text on">보안설정</div>
            </a>
          </li>
          <li>
            <a href="/user2/help/myInfoV2?m=viewManageHistory&amp;lang=ko_KR" className="lnb_item" role="menuitem">
              <div className="lnb_text">이력관리</div>
            </a>
          </li>
        </ul>
      </LnbArea>

      <ProfileArea>
       
      </ProfileArea>

      <HeaderLeft>
        <ul className="left_menu" role="menu">
          <li><a href="/user2/help/myInfoV2?m=viewProfile&amp;lang=ko_KR">내프로필</a></li>
          <li><a href="/user2/help/myInfoV2?m=viewSecurity&amp;lang=ko_KR">보안설정</a></li>
          <li><a href="/user2/help/myInfoV2?m=viewManageHistory&amp;lang=ko_KR">이력관리</a></li>
        </ul>
        <FooterLogo><span className="logo">네이버</span></FooterLogo>
      </HeaderLeft>
    </HeaderSubindex>
  );
}