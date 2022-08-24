import styled from 'styled-components';

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  h2 {
    font-size: 38px;
    margin-bottom: 25px;
    text-align: center;
  }
  
`;

export const CategoryItem = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 30px;
  row-gap: 50px; 
   
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);        
    column-gap: 15px;
    row-gap: 30px;
  }
`;
