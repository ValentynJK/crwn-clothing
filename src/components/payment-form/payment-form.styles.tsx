import styled from 'styled-components';
import Button from '../button/button.component';

export const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;

  @media screen and (max-width: 800px) {
    width: 230px;
  } 
`

export const FormContainer = styled.form`
  height: 100px;
 
`

export const PaymentButton = styled(Button)`
  margin-left:auto;
  margin-top: 30px;
`