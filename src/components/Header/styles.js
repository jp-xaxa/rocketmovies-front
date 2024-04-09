import styled from "styled-components"

export const Container = styled.header`
  grid-area: "header";

  width: 100%;
  height: 11.6rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.4rem 12.3rem;
  gap: 6.4rem;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};

  > h1 {
    font-size: 2.4rem;
    color: ${({ theme }) => theme.COLORS.PINK};
  }
`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4rem;

  > div {
    display: flex;
    flex-direction: column;

    > button:nth-child(1) {
      font-size: 1.4rem;
      color: ${({ theme }) => theme.COLORS.WHITE};
      white-space: nowrap;
      margin-bottom: 0.8rem;
    }

    > button:nth-child(2) {
      font-size: 1.4rem;
      color: ${({ theme }) => theme.COLORS.GRAY_300};
      justify-content: end;
    }
  }

  > img {
    width: 6.4rem;
    height: 6.4rem;
    border-radius: 50%;
    cursor: pointer;
  }
`
