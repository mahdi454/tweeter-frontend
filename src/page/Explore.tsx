import useScreenWidth from "@/hooks/useScreen";
import { MobileMenu } from "@/components/MobileMenu";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { RiSettings5Line } from "react-icons/ri";

export default function Explore() {
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const isNonMobileScreens = useScreenWidth("560px");
  return (
    <div className="relative">
      <nav
        className="sticky w-full top-0 z-50  border-b-[1px] border-slate-600"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      >
        <div className="flex flex-col h-24 backdrop-filter backdrop-blur-sm ">
          <div className="flex justify-between items-center">
            {!isNonMobileScreens && (
              <button className=" m-2 py-1 hover:bg-secondary rounded-full">
                <MobileMenu />
              </button>
            )}
            <div className="relative flex-1  px-2 py-2 ">
              <label htmlFor="search">
                <span
                  className={`absolute top-5 left-7 text-lg ${
                    isFocused ? "text-sky-500" : ""
                  }`}
                >
                  <IoSearch />
                </span>
                <input
                  className="bg-secondary w-full px-14 py-2 rounded-full outline-none border-2 focus:border-sky-500"
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </label>
            </div>
            <span className="text-2xl  p-2 rounded-full hover:bg-slate-800">
              <RiSettings5Line />
            </span>
          </div>
          <div className="flex justify-between items-center">
            <button
              className={`relative w-full flex justify-center h-full items-center hover:text-white  text-muted-foreground  ${
                isActive ? "font-semibold  text-white " : ""
              }`}
              onClick={() => setIsActive(true)}
            >
              Trending
              <span
                className={`${
                  isActive
                    ? "absolute bottom-0 rounded-full h-1 w-16 bg-sky-500"
                    : "hidden"
                }`}
              />
            </button>

            <button
              className={`relative w-full flex justify-center h-full items-center hover:text-white text-muted-foreground pb-2 ${
                !isActive ? "font-semibold  text-white " : ""
              }`}
              onClick={() => setIsActive(false)}
            >
              Sports
              <span
                className={`${
                  !isActive
                    ? "absolute bottom-0 rounded-full h-1 w-14 bg-sky-500"
                    : "hidden"
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

    <div  className="m-2 relative flex">
   <img src="./coming.png" alt="image" className="rounded-xl"/>
    </div>

      
    </div>
  );
}
