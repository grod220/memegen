import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SuccessKidImg from "./success-kid.jpg";
import canvg from "canvg";

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

function copyStylesInline(destinationNode, sourceNode) {
  var containerElements = ["svg", "g"];
  for (var cd = 0; cd < destinationNode.childNodes.length; cd++) {
    var child = destinationNode.childNodes[cd];
    if (containerElements.indexOf(child.tagName) != -1) {
      copyStylesInline(child, sourceNode.childNodes[cd]);
      continue;
    }
    var style =
      sourceNode.childNodes[cd].currentStyle ||
      window.getComputedStyle(sourceNode.childNodes[cd]);
    if (style == "undefined" || style == null) continue;
    for (var st = 0; st < style.length; st++) {
      child.style.setProperty(style[st], style.getPropertyValue(style[st]));
    }
  }
}

// function triggerDownload(svg) {
//   const copy = svg.cloneNode(true);
//   copyStylesInline(copy, svg);
//   let svgData = new XMLSerializer().serializeToString(copy);
//   canvg('canv2', svgData)
// }

function triggerDownload(svg) {
  const copy = svg.cloneNode(true);
  copyStylesInline(copy, svg);
  let svgData = new XMLSerializer().serializeToString(copy);
  const canvas = document.createElement("canvas");
  const svgSize = svg.getBoundingClientRect();
  canvas.width = svgSize.width * 2;
  canvas.height = svgSize.height * 2;
  canvas.getContext('2d').setTransform(2,0,0,2,0,0);
  const img = document.createElement("img");
  img.setAttribute(
    "src",
    "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
  );
  img.onload = function() {
    canvas.style.width = svgSize.width + 'px';
    canvas.style.height = svgSize.height + 'px';
    canvas.getContext("2d").drawImage(img, 0, 0);
    document.querySelector("body").appendChild(canvas);
  };
}

async function convertToDataUri(imagePath) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", event => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img, 0, 0);
      return resolve(canvas.toDataURL());
    });
    img.src = imagePath;
  });
}

export default function SVGEditor() {
  const svgRef = React.useRef();
  const [imgDimensions, setImgDimensions] = useState({
    width: 500,
    height: 500
  });

  const [imgDataUri, setImageDataUri] = useState("");

  useEffect(() => {
    async function run() {
      setImgDimensions(await getImageDimensions(SuccessKidImg));
      setImageDataUri(await convertToDataUri(SuccessKidImg));
    }
    run();
  }, []);

  return (
    <>
      <svg
        ref={svgRef}
        width={imgDimensions.width}
        height={imgDimensions.height}
      >
        <image href={imgDataUri} />
        <Caption text-anchor="middle" x="50%" y="15%">
          SVG domination
        </Caption>
      </svg>
      <button onClick={() => triggerDownload(svgRef.current)}>
        Download PNG
      </button>
      <canvas id="canv2" width="100" height="100" />
    </>
  );
}
