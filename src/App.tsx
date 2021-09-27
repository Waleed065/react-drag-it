import React, { useRef } from "react";
import "./App.css";
import ReactDragIt from "./components/ReactDragIt";

export default function App() {
  const parentRef = useRef(null);

  return (
    <div id={"camera-container"} ref={parentRef}>
      <ReactDragIt parentRef={parentRef}>
        <div style={{ width: 100, height: 100, backgroundColor: "red" }}>
          Drag Me
        </div>
      </ReactDragIt>
    </div>
  );
}
