import React from 'react';
import styled from 'styled-components/native';

const Tt = styled.Text`
  color: ${({ theme }) => theme.mainColor.light};
`;

export default function Test() {
  return <Tt>aaaaaaaa</Tt>;
}
