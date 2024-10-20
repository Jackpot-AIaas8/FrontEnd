import { useEffect, useState } from "react";
import styled from "styled-components";
import apiClient from "../token/AxiosConfig";
import { NoneContent } from "../pages/Memeber/Mypage";

export const FundHistorySection = ({ showAll }) => {
  const [fundDTO, setFundDTO] = useState([]);

  useEffect(() => {
    const apiFunding = async () => {
      try {
        const response = await apiClient.get("dog/fundListMyPage");
        const { fundList, dogResponseList } = response.data;

        // fundList에 있는 정보만을 우선적으로 사용
        const extractedData = fundList?.map((fund) => {
          const dog = dogResponseList?.find((dog) => dog.dogId === fund.dogId); // dogResponseList가 있을 때만 찾음
          return {
            // regDate: fund.regDate,
            collection: fund.collection,
            title: dog.title,
            species: dog.species,
            age: dog.age,
            fundMemberNum: dog.fundMemberNum,
            gender: dog.gender === 1 ? "남성" : "여성",
            heart: dog.heart,
            mainImage: dog.mainImage
          };
        });
        setFundDTO(extractedData);
      } catch (error) {
        console.log(error);
      }
    };
    apiFunding();
  }, []);
  console.log(fundDTO);

  const displayedData = showAll ? fundDTO : fundDTO.slice(0, 3);

  const FundItem = ({ fund }) => {
    return (
      <div className="section-fundingHistory">
        <h5 className="fundTitle">{fund.title}</h5>
        <div className="section-image">
        <img className="fundImage" src={fund.mainImage} alt="" />
        </div>
        <span>{fund.species}</span> 
        <span> {fund.age}살</span>
        <p className="fundMembers">참여자 수: {fund.fundMemberNum}</p>
        <p className="fundGenger">{fund.gender}</p>
        <p className="fundCollection">{fund.collection}원</p>
        {/* <p>등록일: {fund.regDate}</p> */}
        <p className="fundHearts">좋아하는 사람수: {fund.heart}명</p>
      </div>
    );
  };

  return (
    <StyledFundHistory>
      <h4 className="text-left p-0 m-0">펀딩 내역</h4>
      {fundDTO?.length ? (
        displayedData.map((fund, index) => <FundItem key={index} fund={fund} />)
      ) : (
        <NoneContent />
      )}
    </StyledFundHistory>
  );
};

const StyledFundHistory = styled.div`
 h5{
  font-size: 1.3rem;
  text-align: left;
 }
 .section-image{
  height: 10%;
  min-width:100px;
  max-width: 200px;
  
 }
 img{
  width: 100%;
  object-fit: scale-down;

 }

`;
