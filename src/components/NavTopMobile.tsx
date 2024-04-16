import { useEffect, useState } from "react";
import { RiSettings5Line, RiTwitterXLine } from "react-icons/ri";
import { MobileMenu } from "./MobileMenu";
import { useSearchParams } from "react-router-dom";

export default function NavTopMobile() {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isScrollingDown, setIsScrollingDown] = useState<boolean>(false);
  const [initialScrollY, setInitialScrollY] = useState(window.scrollY);
  let [searchParams, setSearchParams] = useSearchParams();
  const onFollowing=()=>{
    searchParams.set("tweets", 'following');
    setSearchParams(searchParams);
    setIsActive(false);
  }
  const onForYou=()=>{
    searchParams.set("tweets", 'alltweets');
    setSearchParams(searchParams);
    setIsActive(true);

}
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isDownwardScroll = currentScrollY > initialScrollY;
      setIsScrollingDown(isDownwardScroll);
      setInitialScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [initialScrollY]);
  return (
    <nav
      className={` sticky w-full top-0 border-b-[1px] border-slate-600 ${
        isScrollingDown ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="flex flex-col h-24 backdrop-filter backdrop-blur-sm items-center justify-between">
        <div className=" pt-2 px-2 w-full flex justify-between items-center">
          <MobileMenu />
          <span className="text-2xl  p-2 rounded-full hover:bg-slate-800">
            <RiTwitterXLine />
          </span>
          <span className="text-2xl  p-2 rounded-full hover:bg-slate-800">
            <RiSettings5Line />
          </span>
        </div>
        <div className="w-full flex justify-between items-center">
          <button
            className={`relative w-full flex justify-center h-full items-center hover:text-white  text-muted-foreground pb-2 pt-1 ${
              isActive ? "font-semibold  text-white " : ""
            }`}
            onClick={onForYou}
          >
            All tweets
            <span
              className={`${
                isActive
                  ? "absolute bottom-0 rounded-full h-1 w-20 bg-sky-500"
                  : "hidden"
              }`}
            />
          </button>

          <button
            className={`relative w-full flex justify-center h-full items-center hover:text-white text-muted-foreground pb-2 pt-1 ${
              !isActive ? "font-semibold  text-white " : ""
            }`}
            onClick={onFollowing}
          >
            Following
            <span
              className={`${
                !isActive
                  ? "absolute bottom-0 rounded-full h-1 w-20 bg-sky-500"
                  : "hidden"
              }`}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
