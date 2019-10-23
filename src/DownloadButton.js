import React from "react";
import { observer } from "mobx-react";
import MemeStore from "./store";

// inspired by https://stackoverflow.com/questions/3975499/convert-svg-to-image-jpeg-png-etc-in-the-browser
function makeInlineStylesSVG(svg) {
  const inlineSVG = svg.cloneNode(true);
  inlineSVG.childNodes.forEach((node, index) => {
    const styles = window.getComputedStyle(svg.childNodes[index]);
    Array.from(styles).forEach(style => {
      node.style.setProperty(style, styles.getPropertyValue(style));
    });
  });
  return inlineSVG;
}

// Due to browser limitations. Taken from: https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

function generateCanvas(svg) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const svgSize = svg.getBoundingClientRect();
  canvas.width = svgSize.width * 2;
  canvas.height = svgSize.height * 2;
  canvas.style.width = svgSize.width + "px";
  canvas.style.height = svgSize.height + "px";
  ctx.setTransform(2, 0, 0, 2, 0, 0);
  return { canvas, ctx };
}

function simulateLinkClick(canvas) {
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = URL.createObjectURL(dataURLtoBlob(canvas.toDataURL()));
  link.click();
}

function generateDataUri(svg) {
  const inlineStylesSVG = makeInlineStylesSVG(svg);
  const svgData = new XMLSerializer().serializeToString(inlineStylesSVG);
  return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
}

function triggerDownload(svg) {
  const { canvas, ctx } = generateCanvas(svg);
  const img = document.createElement("img");
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    simulateLinkClick(canvas);
  };
  img.src = generateDataUri(svg);
}

export default observer(() => {
  return <button onClick={() => triggerDownload(MemeStore.svgRef)}>Download PNG</button>;
});
