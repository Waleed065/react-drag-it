import React from "react";
import Drag from "../components/Drag";
import Ripple from "../components/Ripple";

interface schema {
  parentRef: React.RefObject<any>;
  children?: JSX.Element;
}
export default function ReactDrag({ parentRef, children }: schema) {
  return (
    <>
      {children && <Drag parentRef={parentRef}>{children}</Drag>}

      <Ripple parentRef={parentRef} />
    </>
  );
}
