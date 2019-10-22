import React from "react";
import CanvasEditor from "./CanvasEditor";
import Header from "./Header";
import "./App.css";
import SVGEditor from "./svgEditor";

export default () => (
  <>
    <Header />
    <CanvasEditor />
    <SVGEditor />
  </>
);
