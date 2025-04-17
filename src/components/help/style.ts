import styled from 'styled-components';
import { IoIosHelpCircleOutline } from "react-icons/io";

export const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #006B3F;
  text-align: center;
  margin-right: 30px;
`;

export const FAQItem = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const Question = styled.h2`
  font-size: 1.5rem;
  color: #006B3F;
  margin-bottom: 10px;
`;

export const Answer = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
`;

export const HelpIcon = styled(IoIosHelpCircleOutline)`
  color: #006B3F;
  font-size: 45px;
`;