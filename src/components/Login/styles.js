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

export const Section = styled.section`
  width: 100%;
  max-width: 350px;
  margin-right: 30px;
`;

export const Form = styled.form`
  margin-top: 80px;
`;

export const Input = styled.input`
  width: 100%;
  height: 60px;
  color: #333;
  border: 1px solid #dcdce6;
  border-radius: 8px;
  padding: 0 24px;
  margin: 5px;
`;

export const Button = styled.button`
  width: 100%;
  height: 60px;
  background: #64002a;
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

export const A = styled.a`
  display: flex;
  align-items: center;
  margin-top: 15px;
  margin: 5px;
  color: #41414d;
  font-size: 18px;
  text-decoration: none;
  font-weight: bold;
  transition: opacity 0.2s;
  :hover{
    opacity: 0.8;
  }
`