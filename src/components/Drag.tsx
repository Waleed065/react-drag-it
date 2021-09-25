import React, { useRef, useState } from "react";
import useDrag from "../hooks/useDrag";
import "./css/Drag.css";

interface schema {
  parentRef: React.RefObject<any>;
  children: JSX.Element;
}
export default function Drag({ parentRef, children }: schema) {
  const [{ left, top }, setLT] = useState({
    left: 0,
    top: 0,
  });
  const dragRef = useRef<HTMLDivElement>(null);
  useDrag({ setLT, parentRef, dragRef });

  return (
    <div id="drag" ref={dragRef} style={{ left, top }}>
      {children}
    </div>
  );
}
