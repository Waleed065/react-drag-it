import React, { useEffect } from "react";
import { v4 } from "uuid";
import { rippleType } from "../types";
import isMobile from "../utils/isMobile";

interface schema {
  parentRef: React.RefObject<any>;
  setRipples: (arg: any) => void;
}
export default function useRipple({ parentRef, setRipples }: schema) {
  useEffect(() => {
    if (!parentRef.current) return;

    const refObj = parentRef.current;
    let pointerDown: string;

    if (!isMobile()) {
      pointerDown = "mousedown";
    } else {
      pointerDown = "pointerdown";
    }

    refObj.addEventListener(pointerDown, applyCursorRippleEffect);

    return () => {
      refObj.removeEventListener(pointerDown, applyCursorRippleEffect);
    };
    // eslint-disable-next-line
  }, [parentRef, setRipples]);

  const applyCursorRippleEffect = (e: any) => {
    e.preventDefault();
    
    setRipples((prevState: rippleType[]) =>
      prevState.concat({
        left: e.clientX,
        top: e.clientY,
        show: true,
        id: v4(),
      })
    );
  };
}
