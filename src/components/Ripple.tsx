import React, { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import useRipple from "../hooks/useRipple";
import "./css/Ripple.css";

interface schema {
  parentRef: React.RefObject<any>;
}
export default function Ripple({ parentRef }: schema) {
  const rippleRef = useRef<HTMLDivElement>(null);

  const [{ left, top, show }, setRipple] = useState({
    left: 0,
    top: 0,
    show: false,
  });

  useRipple({ parentRef, setRipple });

  const closeRipple = () => {
    setRipple((prevState: any) => ({ ...prevState, show: false }));
  };

  return (
    <CSSTransition
      in={show}
      nodeRef={rippleRef}
      classNames="ripple-transition"
      timeout={300}
      unmountOnExit
      onEntered={closeRipple}
    >
      <div id="ripple" ref={rippleRef} style={{ top, left }} />
    </CSSTransition>
  );
}
