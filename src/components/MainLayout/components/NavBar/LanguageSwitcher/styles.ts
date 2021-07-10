import styled from "styled-components";

import Body from "../../../../Typography/Body";

export const LangaugeSwitcherContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin-right: 125px;
  padding: 10px;

  border: 1px solid black;
  border-radius: 10px;
`;

export const LanguageOption = styled(Body)<{ isActive: boolean }>`
  cursor: pointer;
  color: ${({ isActive, theme }) => (isActive ? theme.colors.blue : "black")};
`;

export const EnglishOption = styled(LanguageOption)`
  font-weight: 500;
`;

export const ChineseOption = styled(LanguageOption)`
  font-weight: 700;
`;

export const LanguageOptionDivider = styled.div`
  width: 1px;

  margin-left: 12px;
  margin-right: 12px;
  border: 1px solid black;

  &:before {
    content: "";
    border: 1px solid black;
  }
`;
