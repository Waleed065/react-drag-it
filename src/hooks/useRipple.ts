import React, { useEffect } from "react";
import isMobile from "../utils/isMobile";

interface schema {
  parentRef: React.RefObject<any>;
  setRipple: (arg: any) => void;
}
export default function useRipple({ parentRef, setRipple }: schema) {
  useEffect(() => {
    if (!parentRef.current) return;

    const refObj = parentRef.current;
    let pointerDown: string;

    if (!isMobile()){
      pointerDown = "mousedown"
    }else{
      pointerDown = "pointerdown"
    }
    
    refObj.addEventListener(pointerDown, applyCursorRippleEffect);

    return () => {
      refObj.removeEventListener(pointerDown, applyCursorRippleEffect);
    };
    // eslint-disable-next-line
  }, [parentRef, setRipple]);


  const applyCursorRippleEffect = (e: any) => {
    e.preventDefault();
    setRipple({
      left: e.clientX,
      top: e.clientY,
      show: true,
    });
  };
}
