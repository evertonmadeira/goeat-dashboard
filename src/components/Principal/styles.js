import styled, { css } from 'styled-components';
import customerImg from '../../assets/customer.jpg';
import foodImg from '../../assets/food.jpg';
import tableImg from '../../assets/table.jpg';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh; 
  /* background: #ebebeb; */

  align-items: center;
  justify-content: center;
  margin-top: 32px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 100%;

  align-items: flex-start;
  justify-content: center;

`;

export const Card = styled.section`
  display: flex;
  width: 320px;
  height: 320px;

  margin: 0 40px;

  border-radius: 8px;

  align-items: flex-start;
  justify-content: center;

  div {
    display: flex;
    flex-direction: column;
    background: #fff;
    width: 164px;
    height: 164px;

    align-items: center;
    justify-content: flex-end;
    margin-top: 8px;

    border-radius: 8px;
    /* border-top-left-radius: 0;
    border-top-right-radius: 0; */

    svg {
      margin-bottom: 24px;
    }

    strong {
      margin-bottom: 8px; 

    }
  }

  ${(props) => props.customer && css`
    flex: 1;
    background: url(${customerImg}) no-repeat center;
    background-size: cover;
    /* opacity: 0.7; */
  `}

  ${(props) => props.food && css`
    flex: 1;
    background: url(${foodImg}) no-repeat center;
    background-size: cover;
    /* opacity: 0.7; */

  `}

  ${(props) => props.table && css`
    flex: 1;
    background: url(${tableImg}) no-repeat center;
    background-size: cover;
    /* opacity: 0.7; */

  `}
`;