import styled from 'styled-components';

export const AuthenticationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  justify-content: space-around;
  margin: 30px auto;

  @media screen and (max-width: 800px) {
    padding: 0 10px;
  }
`;
