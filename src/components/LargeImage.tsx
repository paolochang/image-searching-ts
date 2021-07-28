import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
`;

interface Props {
  largeImageURL: string;
  tags: string;
  setIsModal: any;
}

const LargeImage: React.FC<Props> = ({ largeImageURL, tags, setIsModal }) => {
  const onClickHandler = () => {
    setIsModal(false);
  };

  return (
    <Container onClick={onClickHandler}>
      <img src={largeImageURL} alt={tags} />
      <span>Click screen to return</span>
    </Container>
  );
};

export default LargeImage;
