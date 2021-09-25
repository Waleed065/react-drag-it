import React, { useRef, useState } from "react";
import "./css/Drag.css"
import useDrag from "../hooks/useDrag";

interface schema {
  parentRef: React.RefObject<any>;
  children: JSX.Element;
}
export default function Drag({ parentRef, children }: schema) {
  const [LT, setLT] = useState({
    left: 0,
    top: 0,
  });
  const dragRef = useRef<HTMLDivElement>(null);
  useDrag({ setLT, parentRef, dragRef });

  const { left, top } = LT;

  return (
    <div id="drag" ref={dragRef} style={{ left, top }}>
      {children}
    </div>
  );
}
