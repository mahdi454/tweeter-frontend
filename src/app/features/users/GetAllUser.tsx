import {
    useAddFriendMutation,
    useRemoveFriendMutation,
  } from "@/app/api/userApi";
  import { IUser } from "@/app/types";
  import { useSelector } from "react-redux";
  import { currentUser} from "./userSlice";
  import { useEffect, useState } from "react";
  import { Button } from "@/components/ui/button";
  import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog";
  type VisibilityState = {
    [id: string]: boolean;
  };
  type UnfollowState = {
    [id: string]: boolean;
  };
  type Props = {
    user: IUser;
  };
  export default function GetAllUser({ user }: Props) {
    const [isVisible, setIsVisible] = useState<VisibilityState | null>(null);
    const [isUnfollow, setIsUnfollow] = useState<UnfollowState>({});
    const userMe = useSelector(currentUser);
    const friendList = userMe?.friends;
  
    const [addFriend] = useAddFriendMutation();
    const [removeFriend] = useRemoveFriendMutation();
    const handleAddingFriend = async () => {
      try {
        if (!friendList?.includes(user.id)) {
          setIsVisible((pre) => ({ ...pre, [user.id]: true }));
          await addFriend({ userId: userMe?.id, friendId: user.id }).unwrap();
        }
      } catch (error) {
        console.log(error);
      }
    };
    const handleRemoveFriend = async () => {
      try {
        
          setIsVisible((pre) => ({ ...pre, [user.id]: false }));
          await removeFriend({ userId: userMe?.id, friendId: user.id }).unwrap();
        
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      const friendList = userMe?.friends;
      if (friendList) {
        const initialState: VisibilityState = {};
        friendList.forEach((id) => {
          initialState[id.toString()] = true;
        });
        setIsVisible(initialState);
      }
    }, [userMe]);
    if (isVisible === null) {
      return <div>Loading...</div>;
    }
    return (
      <div key={user.id} className="flex justify-between items-center">
        <div className="  flex  gap-2 py-1  items-center ">
          <img
            className="w-12 h-12  rounded-full "
            src={
              user?.image
                ? `http://localhost:3500/assets/${user?.image}`
                : "./user.png"
            }
            alt="photo"
          />
          <div className="flex flex-col  ">
            <p className=" font-bold tracking-wide">{user?.name}</p>
            <p className="text-muted-foreground text-sm"> {user?.username}</p>
          </div>
        </div>
        <div >
          {isVisible[user.id] ? (
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="font-semibold px-4 py-1 border-[1px] border-slate-500 rounded-full hover:text-red-600 hover:bg-red-200  "
                  onMouseEnter={() =>
                    setIsUnfollow((pre) => ({ ...pre, [user.id]: true }))
                  }
                  onMouseLeave={() =>
                    setIsUnfollow((pre) => ({ ...pre, [user.id]: false }))
                  }
                >
                  {isUnfollow[user.id] ? "Unfollow" : "Following"}
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="w-96 h-60 flex flex-col justify-center gap-2">
                  <h1 className="font-semibold text-xl tracking-wide">
                    Unfollow {user.username}
                  </h1>
                  <p>
                    Their posts will no longer show up in your For You timeline.
                    You can still view their profile, unless their posts are
                    protected.{" "}
                  </p>
                  <Button
                    variant="default"
                    className="w-full text-base py-6 rounded-full mt-1"
                    onClick={handleRemoveFriend}
                  >
                    Unfollow
                  </Button>
                  <DialogClose asChild>
                    <Button
                      variant="ghost"
                      className="w-full text-base py-6 mt-1 rounded-full"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <button
              className="font-semibold bg-white text-black px-4 py-1 rounded-full hover:bg-slate-200"
              onClick={handleAddingFriend}
            >
              Follow
            </button>
          )}
        </div>
      </div>
    );
  }
  

  