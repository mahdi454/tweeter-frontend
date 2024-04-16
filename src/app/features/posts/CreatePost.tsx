import { useNewTweetMutation } from "@/app/api/tweetApi";
import CircularProgress from "@/components/CircularProgress";
import {  useEffect, useRef, useState } from "react";
import { IoMdImages } from "react-icons/io";
import {
  MdOutlineGifBox,
  MdOutlineEmojiEmotions,
  MdOutlineLocationOn,
} from "react-icons/md";

import Loader from "@/components/Loader";
import useAuth from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import { currentUser } from "../users/userSlice";

export default function CreatePost({isModel,onClose}:{isModel: boolean,onClose: ()=>void}) {
  const [tweet, setTweet] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  
  const user = useSelector(currentUser);
  const { userId } = useAuth();
  const max = 200;
  const totalLatter = Number(tweet.length);
  const progress = (totalLatter * 100) / max;

  const [addNewTweet, { isLoading, isSuccess }] = useNewTweetMutation();

  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setTweet("");
      onClose()
    }
  }, [isSuccess]);

  const color = (): string => {
    if (max >= totalLatter && totalLatter >= 180) {
      return "#f7a902f0";
    } else if (max < totalLatter) {
      return "#f71202ef";
    } else {
      return "#02a9f7";
    }
  };

  const onNewTweet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", tweet);
    formData.append("userId", userId);
    if (image) {
      formData.append("image", image);
    }
    await addNewTweet(formData);
    setImage(null)
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    
  };

  if (isLoading) {
    return <div className="pt-10">
    <Loader
      color="#02c4f5"
      loading={true}
      circleSize={4}
      isFull={false}
      className="justify-center gap-10 py-2 "
    />
  </div>
  }

  return (
    <div className={`flex p-1  ${isModel? "":"border-b-[1px] "}border-slate-600 `}>
      <img
        className="w-14 h-14 p-1  rounded-full mx-1"
        src={user?.image ? `http://localhost:3500/assets/${user?.image}`:'./user.png'} 
        alt="photo"
      />
      <div className=" mt-3 ">
        <form onSubmit={onNewTweet} className={`flex flex-col ${isModel? "justify-between":""}`}>
          <label htmlFor="tweet" className="text-lg   ">
            {" "}
            <textarea
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              className={`w-full  outline-none border-b-[1px] border-slate-600 pb-4 overflow-hidden ${isModel? "bg-inherit h-52": "bg-background  h-24"}`}
              name="tweet"
              id="tweet"
              placeholder="What is happening?!"
              rows={totalLatter <= 60 ? 2 : 4}
              cols={50}
            />
            {totalLatter > max && (
              <span className="text-sm text-red-700">
                Upgrade to Premium+ to write longer posts and Articles.
              </span>
            )}
          </label>
          <div className="flex justify-between items-center">
            <div className="flex gap-2  text-sky-400 w-40">
              <span className="relative">
                <button
                  className=" p-2 hover:bg-sky-950 rounded-full text-2xl"
                  onClick={handleClick}
                >
                  <IoMdImages />
                </button>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={hiddenFileInput}
                  style={{ display: "none", height: 1 }}
                />
                {image && <span className=" text-sm">{image.name}</span>}
              </span>
              <span>
                <button className="p-2 hover:bg-sky-950 rounded-full text-2xl">
                  <MdOutlineGifBox />
                </button>
              </span>
              <span>
                <button className="p-2 hover:bg-sky-950 rounded-full text-2xl">
                  <MdOutlineEmojiEmotions />
                </button>
              </span>
              <span>
                <button className="p-2 hover:bg-sky-950 rounded-full text-2xl">
                  <MdOutlineLocationOn />
                </button>
              </span>
            </div>
            <div className=" flex justify-center items-center gap-2">
              {tweet !== "" && (
                <>
                  <div className="relative">
                    <CircularProgress
                      color={color()}
                      progress={progress}
                      strokeWidth={10}
                      radius={50}
                    />
                    {totalLatter >= 180 ? (
                      <span className="absolute top-1.5 left-1/2 transform -translate-x-1/2 text-muted-foreground text-xs">
                        {max - totalLatter}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <span className="h-6 bg-slate-500 w-[1px]" />
                </>
              )}
              <button
                disabled={tweet === "" || totalLatter > max ? true : false}
                className="mr-2 px-4 py-1 rounded-full bg-sky-500 font-semibold disabled:bg-sky-800 hover:bg-sky-600"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
