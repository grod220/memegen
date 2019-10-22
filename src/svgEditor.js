import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SuccessKidImg from "./success-kid.jpg";

const Caption = styled.text`
  font-family: "Impact", monospace;
  fill: white;
  font-size: 55px;
  text-anchor: middle;
  stroke: black;
  stroke-width: 1px;
`;

async function getImageDimensions(imagePath) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = event => {
      return resolve({
        height: event.target.height,
        width: event.target.width
      });
    };
    img.src = imagePath;
  });
}

export default function SVGEditor() {
  const [imgDimensions, setImgDimensions] = useState({
    width: 500,
    height: 500
  });

  useEffect(() => {
    async function run() {
      setImgDimensions(await getImageDimensions(SuccessKidImg));
    }
    run();
  });

  return (
    <>
      <svg width={imgDimensions.width} height={imgDimensions.height}>
        <image xlinkHref={SuccessKidImg} />
        <Caption text-anchor="middle" x="50%" y="15%">SVG domination
        </Caption>
      </svg>
      {/*<button>Download PNG</button>*/}
    </>
  );
}
