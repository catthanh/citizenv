import { useState, useEffect } from "react";
import { screens } from "tailwindcss/defaultTheme";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}

const _sm = (val) => val >= screens.sm && val <= screens.md;
const _md = (val) => val >= screens.md && val <= screens.lg;
const _lg = (val) => val >= screens.lg && val <= screens.xl;
const _xl = (val) => val >= screens.xl && val <= screens["2xl"];
const _2xl = (val) => val >= screens["2xl"];

const getBreakpoint = (w) => {
    if (_sm(w)) return "sm";
    else if (_md(w)) return "md";
    else if (_lg(w)) return "lg";
    else if (_xl(w)) return "xl";
    else if (_2xl(w)) return "2xl";
    else return "all";
};

function useCurrentBreakpoint() {
    const width = useWindowDimensions().width;

    return getBreakpoint(width);
}

export { useCurrentBreakpoint, useWindowDimensions };
