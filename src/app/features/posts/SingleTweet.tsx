import React from "react";
import { ITweetResponse } from "@/app/types";
import { FaRegShareSquare, FaRegHeart, FaRegComment,FaRegClock } from "react-icons/fa";
import { timeSince } from "@/lib/utils";
import { useSelector } from "react-redux";
import { currentUser } from "../users/userSlice";
import { MdMoreHoriz } from "react-icons/md";

interface SingleTweetProps {
  tweet: ITweetResponse;
}

const SingleTweet: React.FC<SingleTweetProps> = ({ tweet }) => {
    const date=new Date(tweet.createdAt)
    const user=useSelector(currentUser)
    const thisUser = tweet.user? tweet.user:user
  return (
    <div className="relative flex  pr-2 pb-1  border-b-[1px] border-slate-600 ">
      
      <img
        className="w-12 h-12 p-1 object-cover rounded-full"
        src={
          thisUser?.image
            ? `http://localhost:3500/assets/${thisUser?.image}`
            : "/user.png"
        }
        alt="photo"
      />
      <div className=" mt-1 w-full">
        <div className="flex gap-1 items-center justify-start">
          <p className=" font-bold tracking-wide">{thisUser?.name}</p>
          <p className=" text-muted-foreground">{thisUser?.username}</p>
          <p className=" flex items-center gap-1 "> <FaRegClock/>{timeSince(date)}</p>
        </div>
        <p className="">{tweet.content}</p>

        <div className=" bg-inherit flex flex-col gap-1 justify-center mt-1 ">
          {tweet.image && (
            <img 
              src={`http://localhost:3500/assets/${tweet.image}`}
              alt="image"
              className="rounded-xl  border-[1px] object-contain max-h-[80vh] border-slate-600 "
            />
          )}
          <div className="flex  justify-between font-extralight text-lg">
            <button className=" p-2 hover:bg-sky-950 hover:text-sky-400 rounded-full ">
              <FaRegComment />
            </button>
            <button className=" p-2 hover:bg-red-950 hover:text-red-500 rounded-full ">
              <FaRegHeart />
            </button>
            <button className=" p-2 hover:bg-green-950 hover:text-green-400 rounded-full ">
              <FaRegShareSquare />
            </button>
          </div>
        </div>
      </div>
      <span className="absolute right-2 rounded-full text-xl top-2 p-1.5 hover:bg-sky-950 hover:text-sky-400">
      <MdMoreHoriz />
      </span>
    </div>
  );
};

export default SingleTweet;
