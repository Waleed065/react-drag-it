import React from "react";
import Drag from "../components/Drag";
import PointerEvents from "./PointerEvents";

interface schema {
  parentRef: React.RefObject<any>;
  children?: JSX.Element;
  showRipple?: boolean;
}
export default function ReactDrag({
  parentRef,
  showRipple = true,
  children,
}: schema) {
  return (
    <>
      {children && <Drag parentRef={parentRef}>{children}</Drag>}

      {showRipple && <PointerEvents parentRef={parentRef} />}
    </>
  );
}
