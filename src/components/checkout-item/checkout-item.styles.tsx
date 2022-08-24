import styled from 'styled-components';

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;

  @media screen and (max-width: 1024px) {
    font-size: 14px;
  }
`;

export const ImageContainer = styled.div`
  padding-right: 15px;

  @media screen and (max-width: 1024px) {
   padding-right: 5px;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

export const BaseSpan = styled.span`
  justify-self: center;
`;

export const Quantity = styled(BaseSpan)`
  display: flex;
`;

export const Arrow = styled.div`
  cursor: pointer;
  @media screen and (max-width: 800px) {
    font-size: 14px;
  }
`;

export const Value = styled.span`
  margin: 0 10px;
`;

export const RemoveButton = styled.div`
  justify-self: center;
  cursor: pointer;
`;