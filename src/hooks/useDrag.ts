import { useEffect, useRef } from "react";
import isMobile from "../utils/isMobile";

interface schema {
  dragRef: React.RefObject<HTMLDivElement>;
  parentRef: React.RefObject<any>;
  setLT: ({ left, top }: { left: number; top: number }) => void;
}
export default function useDrag({ dragRef, parentRef, setLT }: schema) {
  let itemXGap = useRef(0).current;
  let itemYGap = useRef(0).current;
  let isActive = useRef(false).current;

  useEffect(() => {
    if (!parentRef.current || !dragRef.current) return;
    const parentRefObj = parentRef.current;
    const dragRefObj = dragRef.current;
    let pointerDown: string;
    let pointerUp: string;
    let pointerMove: string;

    if (!isMobile()) {
      pointerDown = "mousedown";
      pointerMove = "mousemove";
      pointerUp = "mouseup";
    } else {
      pointerDown = "touchstart";
      pointerMove = "touchmove";
      pointerUp = "touchend";
    }

    dragRefObj.addEventListener(pointerDown, Drag);
    parentRefObj.addEventListener(pointerMove, Move);
    parentRefObj.addEventListener(pointerUp, Drop);

    return () => {
      dragRefObj.removeEventListener(pointerDown, Drag);

      parentRefObj.removeEventListener(pointerMove, Move);
      parentRefObj.removeEventListener(pointerUp, Drop);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Drag = (e: any) => {
    e.preventDefault();
    isActive = true;
    const { offsetLeft = 0, offsetTop = 0 } = dragRef.current ?? {};

    itemXGap = e.pageX - offsetLeft;
    itemYGap = e.pageY - offsetTop;
  };

  const Move = (e: any) => {
    e.preventDefault();

    if (!isActive) return;

    // let pointerX: number;
    // let pointerY: number;

    // if (e.pageX) {
    // pointerX = e.pageX;
    // pointerY = e.pageY;
    // } else if (e.clientX) {
    //   pointerX = e.clientX;
    //   pointerY = e.clientY;
    // } else return;

    setLT({ left: e.pageX - itemXGap, top: e.pageY - itemYGap });
  };

  const Drop = (e: any) => {
    e.preventDefault();

    isActive = false;

  };
}
