import styled from "styled-components";

export const Container = styled.div`
  padding-left: 30px;
  padding-top: 15px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  color: #0050dc;
  margin-bottom: 14px;
`;

export const ErrorText = styled.p`
  font-size: 12px;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  padding-right: 12px;
  color: red;
`;

export const Label = styled.label`
  font-size: 16px;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  padding-right: 12px;
`;

export const Input = styled.input`
  font-size: 16px;
  font-family: Roboto, sans-serif;
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1.5px solid #858585;
  &:hover {
    border-bottom: 2px solid black;
  }
  &:focus {
    border-bottom-color: #0050dc;
  }
`;

export const Button = styled.button`
  font-size: 16px;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  padding: 15px 30px;
  border-radius: 42px;
  background-color: #0050dc;
  color: #fafafa;
  cursor: pointer;
  border: 0px;
  &:hover {
    border: 1.5px solid #50a5ff;
  }
`;
