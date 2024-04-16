import { ArrowLeft, X } from "lucide-react";
import { useSelector } from "react-redux";
import { currentUser } from "@/app/features/users/userSlice";
import { PiLockKeyBold } from "react-icons/pi";
import { MdOutlineCalendarMonth, MdOutlineLocationOn } from "react-icons/md";

import SingleTweet from "@/app/features/posts/SingleTweet";
import { ITweetResponse } from "@/app/types";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { useNavigate} from "react-router-dom";

export default function Profile() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const user = useSelector(currentUser);
  const allTweets = user?.tweets;
  const date = user?.createdAt && new Date(user.createdAt);
  const joined = date ? formatDate(date) : "";
  const navigate = useNavigate();

  return (
    <>
      <div className="relative flex flex-col">
        <nav
          className="sticky w-full top-0 z-50  border-b-[1px] border-slate-600"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <div className="flex h-14 backdrop-filter backdrop-blur-sm items-center justify-between">
            <div className=" mx-4 flex gap-8">
              <button className="m-1 p-2 hover:bg-secondary rounded-full" 
              onClick={()=>navigate('..')}>
                <ArrowLeft />
              </button>
              <span>
                <p className="flex gap-1 items-center text-lg font-bold">
                  {user?.name}
                  <span>
                    <PiLockKeyBold />
                  </span>
                </p>
                <p className="text-muted-foreground text-sm">
                  {allTweets?.length ? allTweets.length : 0} posts
                </p>
              </span>
            </div>
          </div>
        </nav>
        <div className="relative w-full mr-96 ">
          <img
            src={`./coming.png`}
            alt="image"
            className="w-full object-cover  max-h-[260px] "
          />
        </div>
      </div>
     
      <div className={`relative w-full  px-5`}>
          <img
            className={`absolute -top-16 w-32 h-32 rounded-full border-4 border-slate-600`}
            src={
              user?.image
                ? `http://localhost:3500/assets/${user?.image}`
                : "./user.png"
            }
            alt="photo"
          />
          <div className="flex justify-end">
            <button className="mt-8 px-4 font-semibold py-1 rounded-full border-[1px] border-slate-400 hover:bg-secondary">
              Edit profile
            </button>
          </div>
        </div>
      <div className=" flex flex-col w-full px-6 pt-2  ">
  
        <span className="flex flex-col ml-1 ">
          <p className="flex gap-2 items-center text-xl font-bold">
            {user?.name}
            <span>
              <PiLockKeyBold />
            </span>
          </p>
          <p className="flex text-muted-foreground"> {user?.username}</p>
        </span>
        <div className="m-1">
          <p className="my-2 font-semibold tracking-wide">
            Bio, Keep life simple
          </p>
          <div className="flex justify-start items-center gap-1 text-muted-foreground">
            <span className="text-white">
              <MdOutlineLocationOn />
            </span>
            <p className="mr-5">Some</p>
            <span className="text-white">
              {" "}
              <MdOutlineCalendarMonth />
            </span>
            <p>Joined {joined}</p>
          </div>
          <div className="flex justify-start gap-8 items-center my-1">
            <p className=" font-bold">
              {" "}
              69{" "}
              <span className="text-muted-foreground text-base">Following</span>
            </p>
            <p className=" font-bold">
              {" "}
              3{" "}
              <span className="text-muted-foreground text-base">Followers</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center border-b-[1px] border-slate-600 ">
        <button
          className={`relative w-full flex justify-center h-full items-center hover:text-white hover:bg-secondary text-muted-foreground p-2 ${
            isActive ? "font-semibold  text-white " : ""
          }`}
          onClick={() => setIsActive(true)}
        >
          Posts
          <span
            className={`${
              isActive
                ? "absolute bottom-0 rounded-full h-1 w-12 bg-sky-500"
                : "hidden"
            }`}
          />
        </button>

        <button
          className={`relative w-full flex justify-center h-full items-center hover:text-white hover:bg-secondary text-muted-foreground p-2 ${
            !isActive ? "font-semibold  text-white " : ""
          }`}
          onClick={() => setIsActive(false)}
        >
          Likes
          <span
            className={`${
              !isActive
                ? "absolute bottom-0 rounded-full h-1 w-12 bg-sky-500"
                : "hidden"
            }`}
          />
        </button>
      </div>
      {allTweets && (
        <div>
          {allTweets.map((tweet: ITweetResponse) => (
            <SingleTweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
      )}
    </>
  );
}
