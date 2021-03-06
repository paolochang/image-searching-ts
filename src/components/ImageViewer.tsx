import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { ImageInfoModel } from "../types";
import LargeImage from "./LargeImage";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 15vw);
  grid-auto-rows: minmax(auto, auto);
  grid-gap: 5px;
  align-items: center;
`;
const StyledImage = styled.img`
  object-fit: scale-down;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  background-color: black;
`;

interface Props {
  loading: boolean;
  setLoading: any;
  setPage: any;
  images: any;
}

const ImageViewer: React.FC<Props> = ({
  loading,
  setLoading,
  setPage,
  images,
}) => {
  const [isModal, setIsModal] = useState(false);
  const [image, setImage] = useState({ largeImageURL: "", tags: "" });
  const viewerRef = useRef<HTMLDivElement>(null);

  const onClickHandler = (largeImageURL: string, tags: string) => {
    setImage({ largeImageURL, tags });
    setIsModal(true);
  };

  useEffect(() => {
    const onScrollHandler = () => {
      if (!loading && viewerRef.current) {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          setPage((prev: number) => prev + 1);
          setLoading(true);
        }
      }
    };
    window.addEventListener("scroll", onScrollHandler);
    return () => window.removeEventListener("scroll", onScrollHandler);
  }, [viewerRef, loading, setLoading, setPage]);

  return (
    <Container ref={viewerRef}>
      {images?.map((image: ImageInfoModel) => (
        <StyledImage
          key={image.id}
          src={image.webformatURL}
          alt={image.tags}
          onClick={() => onClickHandler(image.largeImageURL, image.tags)}
        />
      ))}
      {isModal && <LargeImage {...image} setIsModal={setIsModal} />}
    </Container>
  );
};

export default ImageViewer;
