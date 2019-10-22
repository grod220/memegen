import React, { useEffect } from "react";
import MostInterestingManImg from "./most-interesting-man.jpg";

export default function CanvasEditor() {
  const canvasRef = React.useRef();
  useEffect(() => {
    const canvasEl = canvasRef.current;
    const imageEl = new Image();
    imageEl.src = MostInterestingManImg;
    imageEl.onload = () => {
      const ctx = canvasEl.getContext("2d");
      canvasEl.width = imageEl.width;
      canvasEl.height = imageEl.height;
      ctx.drawImage(imageEl, 0, 0);

      ctx.font = "48px impact";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Call me Mr. Canvas", canvasEl.width / 2, 70);
    };
  });

  return (
    <>
      <canvas ref={canvasRef} />
    </>
  );
}
