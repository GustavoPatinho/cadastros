import styled from "styled-components";

export const Container = styled.div`
  padding: 30px;
  max-width: 100%;
`;

export const Button = styled.button`
  font-size: 16px;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  padding: 10px 20px;
  border-radius: 42px;
  background-color: #0050dc;
  color: #fafafa;
  cursor: pointer;
  border: 0px;
  &:hover {
    border: 1.5px solid #50a5ff;
  }
  margin-top: 12px;
`;
