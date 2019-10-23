import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemeStore from "./store";

const Caption = styled.text`
  font-family: "Impact", monospace;
  fill: white;
  font-size: 55px;
  text-anchor: middle;
  stroke: black;
  stroke-width: 1px;
`;

async function loadImage(imagePath) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = event => {
      return resolve(img);
    };
    img.src = imagePath;
  });
}

async function convertToDataUri(image) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext("2d").drawImage(image, 0, 0);
    return resolve(canvas.toDataURL());
  });
}

export default function Meme({ imagePath, captions }) {
  const [imgDimensions, setImgDimensions] = useState({
    width: 500,
    height: 500
  });
  const [imgDataUri, setImageDataUri] = useState("");

  function initializeImage() {
    (async function() {
      const loadedImage = await loadImage(imagePath);
      setImgDimensions({
        height: loadedImage.height,
        width: loadedImage.width
      });
      setImageDataUri(await convertToDataUri(loadedImage));
    })();
  }

  useEffect(initializeImage, [imagePath]);

  const svgRef = React.useRef();
  MemeStore.svgRef = svgRef.current;

  return (
    <>
      <svg ref={svgRef} width={imgDimensions.width} height={imgDimensions.height}>
        <image href={imgDataUri} />
        {captions.map((caption, index) => (
          <Caption key={index} text-anchor="middle" x="50%" y="15%">
            {caption.text}
          </Caption>
        ))}
      </svg>
    </>
  );
}
