import React from "react";
import styled from "styled-components";
import theme from "../config/theme";

// Styled Components 정의
const CategoriesSection = styled.div`
  gap: 16px;
  margin: 16px 0;
`;

const CategoryText = styled.p`
  font-size: 0.875rem; /* body2 크기와 동일 */
  color: ${theme.colors.blue};
  font-weight: bold;
`;

const Categories = ({ categories }) => {
  return (
    <CategoriesSection className="flex flex-row">
      {categories.map((category, index) => (
        <CategoryText className="flex" key={index}>
          {category}
        </CategoryText>
      ))}
    </CategoriesSection>
  );
};

export default Categories;
