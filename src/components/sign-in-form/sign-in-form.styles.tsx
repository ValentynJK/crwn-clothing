import styled from 'styled-components';

export const SignInContainer = styled.div`
  width: 380px;
    h2 {
      margin: 10px 0;
    }
`;

export const SignInButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    gap: 10px;

    button {
      width: 250px;
    }

  }
`;
