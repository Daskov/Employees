import React from "react";
import styled from "styled-components";

const NotFound = () => {
  const StyledNotFound = styled.div`
  margin: 200px auto 0;
  text-align: center;
  font-size: 120px;
  font-weight: 700;
  color white;
  `;
  return <StyledNotFound>404</StyledNotFound>;
};

export default NotFound;
