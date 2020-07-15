import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signInBackGroundImg from '../../assets/signup-cadastro.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;
const appearFromRight = keyframes`
from{
  opacity:0;
  transform: translateX(50px);
}
to{
  opacity:1;
  transform: translateX(0);
}
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
`;

export const ContainerAnimated = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      transition: color 0.2s;
      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  > a {
    color: #f4ede8;
    display: flex;
    align-items: center;
    margin-top: 24px;
    transition: color 0.2s;
    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
    svg {
      margin-right: 16px;
    }
  }
`;
export const Background = styled.div`
  flex: 1;
  background: url(${signInBackGroundImg}) no-repeat center;
  background-size: cover;
`;