import GetAllUser from "@/app/features/users/GetAllUser";
import { currentUser, userList } from "@/app/features/users/userSlice";
import { IUser } from "@/app/types";
import useScreenWidth from "@/hooks/useScreen";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function Overview() {
  const [isFocused, setIsFocused] = useState(false);
  const isNonMobileScreens = useScreenWidth("560px");
  const userMe = useSelector(currentUser);
  const friendList = userMe?.friends;
  const allUser = useSelector(userList);
  const allUserNotMe = allUser?.filter((user: IUser) => user.id !== userMe?.id);
  const notInfriendList = allUserNotMe?.filter(
    (user: IUser) => !friendList?.includes(user.id)
  );
  return (
    <div
      className={`relative xl:flex  flex-col ${
        isNonMobileScreens ? "hidden" : ""
      }`}
    >
      <div className="sticky top-0 right-0 bg-background max-w-md">
        <div className="  px-4 py-6 ">
          <label htmlFor="search">
            <span
              className={`absolute top-10 left-9 text-lg ${
                isFocused ? "text-sky-500" : ""
              }`}
            >
              <IoSearch />
            </span>
            <input
              className="bg-secondary w-full px-12 py-3 rounded-full outline-none border-2 focus:border-sky-500"
              type="search"
              name="search"
              id="search"
              placeholder="Search"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </label>
        </div>
        <div className="relative mx-4 bg-secondary rounded-lg px-4 py-2  ">
          <h2 className="text-xl tracking-wide font-black mb-1">
            Subscribe to Premium
          </h2>
          <p>
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </p>
          <button className="bg-sky-600 hover:bg-sky-700 my-3 text-lg px-10 py-2 rounded-full">
            Subscribe
          </button>
        </div>
        <div className="relative m-4 bg-secondary rounded-lg px-4 py-2  ">
          <h1 className="text-2xl font-bold tracking-wider mb-2">You might like </h1>

        {notInfriendList && notInfriendList.map((user:IUser)=><GetAllUser key={user.id} user={user}/>) }
        </div>
      </div>
    </div>
  );
}
