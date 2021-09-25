import React, { useEffect } from "react";

interface schema {
  parentRef: React.RefObject<any>;
  setRipple: (arg: any) => void;
}
export default function useRipple({ parentRef, setRipple }: schema) {
  useEffect(() => {
    if (!parentRef.current) return;

    const refObj = parentRef.current;

    const applyCursorRippleEffect = (e: any) => {
      setRipple({
        left: e.clientX,
        top: e.clientY,
        show: true,
      });
    };
    refObj.addEventListener("pointerdown", applyCursorRippleEffect);

    return () => {
      refObj.removeEventListener("pointerdown", applyCursorRippleEffect);
    };
  }, [parentRef, setRipple]);
}
