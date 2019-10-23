import React from "react";
import SuccessKidImg from "./success-kid.jpg";
import Meme from "./Meme";
import DownloadButton from "./DownloadButton";

export default function SVGEditor() {
  return (
    <>
      <Meme
        imagePath={SuccessKidImg}
        captions={[
          {
            size: "10",
            text: "Show me the money",
            positionX: "50%",
            positionY: "10%",
            fontFamily: "Impact"
          }
        ]}
      />
      <DownloadButton />
    </>
  );
}
