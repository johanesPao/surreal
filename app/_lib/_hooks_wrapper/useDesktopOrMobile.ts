"use client";

// custom hook wrapper untuk menentukan viewport

import { useEffect, useState } from "react";

const useDesktopOrMobile = () => {
  const [diDesktop, setDiDesktop] = useState<boolean | undefined>(undefined);
  const [lebarWindow, setLebarWindow] = useState<number | undefined>(undefined);

  useEffect(() => {
    // only do in client when window is not undefined
    if (typeof window !== "undefined") {
      // setLebarWindow on first render di client
      setLebarWindow(window.innerWidth);
      // setDiDesktop or not berdasar window.innerWidth on first render
      setDiDesktop(window.innerWidth >= 1024);
    }

    // add event listener resize pada window client dan callback setLebarWindow
    window.addEventListener("resize", () => {
      setLebarWindow(window.innerWidth);
    });

    // clean up useEffect window event
    return window.removeEventListener("resize", () => {});
  }, []);

  useEffect(() => {
    // only in client
    if (typeof window !== "undefined") {
      // lebarWindow tidak undefined atau null, setDiDesktop berdasar lebarWindow >= 1024
      lebarWindow && lebarWindow >= 1024
        ? setDiDesktop(true)
        : setDiDesktop(false);
    }
    // trigger setiap kali lebarWindow berubah
  }, [lebarWindow]);

  // hook return diDesktop dan lebarWindow
  // diDesktop akan sangat dibutuhkan oleh beberapa client component untuk menentukan
  // layout desain
  return [diDesktop, lebarWindow];
};

export default useDesktopOrMobile;
