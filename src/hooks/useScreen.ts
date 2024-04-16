import { useState, useEffect } from "react";

const useScreenWidth = (minWidth: string): boolean => {
  const [isNonMobileScreen, setIsNonMobileScreen] = useState(false);

  const checkScreenWidth = () => {
    const screenWidth = window.innerWidth;

    setIsNonMobileScreen(screenWidth >= parseInt(minWidth));
  };

  useEffect(() => {
    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []); // Empty dependency

  return isNonMobileScreen;
};

export default useScreenWidth;
