import React, { memo, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { rippleType } from "../types";
import "./css/Ripple.css";

interface schema {
  properties: rippleType;
  setRipples: (arg: any) => void;
}
function Ripple({ properties: { show, top, left, id }, setRipples }: schema) {
  const rippleRef = useRef<HTMLDivElement>(null);
  // console.log({show, top, left, id })

  const timer = useRef<any>(null);
  useEffect(() => {
    if (show) return;
    timer.current = setTimeout(() => {
      setRipples((prevState: any) =>
        prevState.filter((pointer: rippleType) => pointer.id !== id)
      );
    }, 300);
    return () => {
      setRipples((prevState: any) =>
        prevState.filter((pointer: rippleType) => pointer.id !== id)
      );

      clearTimeout(timer.current);
    };
    // eslint-disable-next-line
  }, [show]);

  const closeRipple = () => {
    setRipples((prevState: rippleType[]) =>
      prevState.map((pointer: rippleType) =>
        pointer.id === id ? { ...pointer, show: false } : pointer
      )
    );
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
      <div className="ripple" ref={rippleRef} style={{ top, left }} />
    </CSSTransition>
  );
}

function shouldMemo(prevState: any, nextState: any) {
  return prevState.properties.show === nextState.properties.show ? true : false;
}
export default memo(Ripple, shouldMemo);
