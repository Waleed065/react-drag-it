import React, { useState } from "react";
import { TransitionGroup } from "react-transition-group";
import useRipple from "../hooks/useRipple";
import { rippleType } from "../types";
import Ripple from "./Ripple";

interface schema {
  parentRef: React.RefObject<any>;
}

export default function PointerEvents({ parentRef }: schema) {
  const [ripples, setRipples] = useState<rippleType[]>([]);

  useRipple({ parentRef, setRipples });

//   console.log(ripples)
  return (
    <TransitionGroup>
      {ripples.map((properties, index) => (
        <Ripple
          key={index}
          properties={properties}
          setRipples={setRipples}
        />
      ))}
    </TransitionGroup>
  );
}
