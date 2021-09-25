# React Drag It

This is a react component for using draggable components in your React App. It offers easy implementation with upto date and optimized performance.

## Steps To Setup and use

Once installed, make sure to wrap your ReactDragIt component inside a parent element of a defined width and height to assign a dragable area to the ReactDragIt Component.
Make sure to pass a ref of parent element to the ReactDragIt component

Import the package and use it around your custom components

    import React, { useRef } from 'react';
    import ReactDragIt from "react-drag-it";

    export default function App() {
        const parentRef = useRef(null);

        return (
            <div ref={parentRef} 
                // A defined width and height will assign a dragable area to ReactDragIt
                style={{
                    width: "100vw",
                    height: "100vh",
                    position: "relative"
                }} 
            >
                <ReactDragIt parentRef={parentRef}>
                    {/* Provide a draggable component */}

                    <div style={{width: 100, height: 100, backgroundColor: "green"}}>
                        Drag Me
                    </div>
                </ReactDragIt>
            </div>
        );
    }

## Props

- RefObject
    - Required: true
    - type: React.RefObject
    - Description: Reference of parent element


- disableRipple
    - Required: false
    - type: boolean
    - default: false
    - Description: Disables ripple effect

- children
    - Required: false
    - type: JSX.Element
    - Description: Assigns a dragable component