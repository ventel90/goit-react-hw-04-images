import styled from '@emotion/styled';

export const GalleryItem = styled.li`
  width: 330px;
  height: 210px;
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  cursor: zoom-in;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 300ms ease-in-out;
  filter: grayscale(0.5);
  :hover {
    filter: grayscale(0);
    transform: scale(1.05);
  }
`;
