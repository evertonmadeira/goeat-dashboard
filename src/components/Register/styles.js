import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1120;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  padding: 150px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0,0, 0.1);
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Section = styled.section`
  width: 100%;
  max-width: 430px;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 450px;
`;

export const Button = styled.button`
  width: 100%;
  height: 60px;
  background: #3db8cc;
  color: #fff;
  border: 0;
  border-radius: 8px;
  font-weight: 700;
  margin-top: 11px;
  margin: 5px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  line-height: 60px;
  transition: filter 0.2s;
  :hover {
    filter: brightness(90%)
  }
`;

export const Input = styled.input`
  margin-top: 8px;
  width: 100%;
  height: 60px;
  color: #333;
  border: 1px solid #dcdce6;
  border-radius: 8px;
  padding: 0 24px;
  margin: 5px;
`;