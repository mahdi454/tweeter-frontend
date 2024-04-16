import { useState } from "react";
import { RiSettings5Line } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";

export default function NavTop() {
  const [isActive, setIsActive] = useState<boolean>(true);
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
  return (
    <nav
      className="sticky w-full top-0 border-b-[1px] border-slate-600"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="flex h-14 backdrop-filter backdrop-blur-sm items-center justify-between">
        <button
          className={`relative w-full flex justify-center h-full items-center hover:text-white  text-muted-foreground  ${
            isActive ? "font-semibold  text-white " : ""
          }`}
          onClick={onForYou}
        >
          All Tweets
          <span
            className={`${
              isActive ? "absolute bottom-0 rounded-full h-1 w-20 bg-sky-500" : "hidden"
            }`}
          />
        </button>

        <button
          className={`relative w-full flex justify-center h-full items-center hover:text-white text-muted-foreground pb-2 ${
            !isActive ? "font-semibold  text-white " : ""
          }`}
          onClick={onFollowing}
        >
          Following
          <span
            className={`${
              !isActive ? "absolute bottom-0 rounded-full h-1 w-20 bg-sky-500" : "hidden"
            }`}
          />
        </button>
        <span className="text-2xl mx-4 p-2 rounded-full hover:bg-slate-800">
          <RiSettings5Line />
        </span>
      </div>
    </nav>
  );
}
