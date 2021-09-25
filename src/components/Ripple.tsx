import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { rippleType } from "../types";
import "./css/Ripple.css";

interface schema {
  properties: rippleType;
  setRipples: (arg: any) => void;
}
function Ripple({ properties: { show, top, left, id }, setRipples }: schema) {
  const rippleRef = useRef<HTMLDivElement>(null);

  const closeRipple = () => {
    setRipples((prevState: rippleType[]) =>
      prevState.map((pointer: rippleType) =>
        pointer.id === id ? { ...pointer, show: false } : pointer
      )
    );
  };

  const unmount = () => {
    setRipples((prevState: rippleType[]) =>
      prevState.filter((pointer: rippleType) => pointer.id !== id)
    );
  };

  return (
    <CSSTransition
      in={show}
      nodeRef={rippleRef}
      classNames="ripple-transition"
      timeout={400}
      unmountOnExit
      onEnter={closeRipple}
      // onEntered={closeRipple}
      // onExit={unmount}
      onExit={unmount}
    >
      <div className="ripple" ref={rippleRef} style={{ top, left }} />
    </CSSTransition>
  );
}

// function shouldMemo(prevState: any, nextState: any) {
//   return prevState.properties.id === nextState.properties.id && prevState.properties.show === nextState.properties.show;
// }
export default Ripple;
