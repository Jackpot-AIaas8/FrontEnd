import React from "react";
import styled from "styled-components";

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Section = styled.div`
  width: 80%;
  background-color: #e0f7e0;
  border: 1px solid #b2d8b2;
  border-radius: 15px; /* 모든 섹션에 동일한 둥근 모서리 적용 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
`;

const SectionHeader = styled.div`
  background-color: #2e8b57;
  color: white;
  padding: 10px;
  border-radius: 15px 15px 0 0; /* 상단 모서리만 둥글게 */
  font-weight: bold;
`;

const SectionContent = styled.div`
  padding: 10px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

// 리액트 컴포넌트
const ProfilePage = () => {
  return (
    <Container>
      <Section>
        <SectionHeader>내 프로필</SectionHeader>
        <SectionContent>
          <p>사용자 이름: 전세계</p>
          <p>전화번호: +82 10-3***-2***</p>
          <Button>수정</Button>
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>보안 설정</SectionHeader>
        <SectionContent>
          <p>비밀번호 변경</p>
          <p>2단계 인증</p>
          <Button>설정</Button>
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>이력 관리</SectionHeader>
        <SectionContent>
          <p>로그인 목록 확인</p>
          <p>내 활동 기록 보기</p>
          <Button>확인</Button>
        </SectionContent>
      </Section>
    </Container>
  );
};
export default ProfilePage;
