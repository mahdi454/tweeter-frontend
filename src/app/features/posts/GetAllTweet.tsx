import { useGetAllTweetQuery } from "@/app/api/tweetApi";
import SingleTweet from "./SingleTweet";
import { ITweetResponse } from "@/app/types";
import Loader from "@/components/Loader";
import { useSelector } from "react-redux";
import { currentUser } from "../users/userSlice";
import { useSearchParams } from "react-router-dom";

export default function GetAllTweet() {
  const [searchParams] = useSearchParams();
  const { data: allTweets = [], isLoading, isError } = useGetAllTweetQuery({});
  const userMe = useSelector(currentUser);
  const friendList = userMe?.friends;
  const tweets=searchParams.get('tweets')|| 'allweets';
  const followedTweet=allTweets.filter((tweet:ITweetResponse)=>friendList?.includes( tweet.userId))
const filteredTweets=tweets==='alltweets' ? allTweets:followedTweet
  if (isLoading) {
    return (
      <div className="pt-20">
        <Loader
          color="#02c4f5"
          loading={true}
          circleSize={4}
          isFull={false}
          className="justify-center gap-10 py-2 "
        />
      </div>
    );
  }

  if (isError) {
    if (!allTweets.length) {
      return (
        <div className="text-center mt-1 text-red-700">
          There is no tweet, create one!{" "}
        </div>
      );
    } else return <div>sorry, some thing is wrong!</div>;
  }

  return (
    <>
      {filteredTweets && (
        <div>
          {filteredTweets.map((tweet: ITweetResponse) => (
            <SingleTweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
      )}
    </>
  );
}
