import { useEffect, useRef } from "react";
import checkIsMobile from "../utils/isMobile";

const isMobile = checkIsMobile();

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
    parentRefObj.style.position = "relative";
    parentRefObj.style.overflow = "hidden";


    let pointerDown: string;
    let pointerUp: string;
    let pointerMove: string;

    if (!isMobile) {
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

    itemXGap = (e.clientX ?? e.changedTouches[0].clientX) - offsetLeft;
    itemYGap = (e.clientY ?? e.changedTouches[0].clientY) - offsetTop;
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
    const left = (e.clientX ?? e.changedTouches[0].clientX) - itemXGap;
    const top = (e.clientY ?? e.changedTouches[0].clientY) - itemYGap;

    setLT({ left, top });
  };

  const Drop = (e: any) => {
    e.preventDefault();

    isActive = false;
  };
}
