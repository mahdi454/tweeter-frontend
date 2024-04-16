import { useLogoutMutation } from "@/app/api/authApi";
import { currentUser } from "@/app/features/users/userSlice";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CgMoreO } from "react-icons/cg";
import { MdBookmark, MdListAlt, MdLogout } from "react-icons/md";
import { PiBriefcaseBold, PiLockKeyBold } from "react-icons/pi";
import { RiTwitterXLine, RiUserLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type LinkType = {
  id: number;
  path: string;
  icon: JSX.Element;
  label: string;
};
const LINK_LIST: LinkType[] = [
  { id: 1, label: "Profile", path: "/profile", icon: <RiUserLine /> },
  { id: 2, label: "Premium", path: "#", icon: <RiTwitterXLine /> },
  { id: 3, label: "More", path: "#", icon: <CgMoreO /> },
  { id: 5, label: "Bookmarks", path: "#", icon: <MdBookmark /> },
  { id: 6, label: "List", path: "#", icon: <MdListAlt /> },
  { id: 7, label: "Job", path: "#", icon: <PiBriefcaseBold /> },
];
export function MobileMenu() {
  const user = useSelector(currentUser);
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <img
          className="w-10 h-10 rounded-full mx-1"
          src={
            user?.image
              ? `http://localhost:3500/assets/${user?.image}`
              : "./user.png"
          }
          alt="photo"
        />
      </SheetTrigger>
      <SheetContent side="left" className="m-0 py-0 px-0">
        <SheetHeader>
          <SheetTitle>
            <div className=" flex flex-col px-5 pt-4 ">
              <img
                className="w-12 h-12 rounded-full mb-1"
                src={
                  user?.image
                    ? `http://localhost:3500/assets/${user?.image}`
                    : "./user.png"
                }
                alt="photo"
              />
              <span className="flex flex-col mb-1 ">
                <p className="flex gap-2 items-center text-xl font-bold">
                  {user?.name}
                  <span>
                    <PiLockKeyBold />
                  </span>
                </p>
                <p className="flex text-muted-foreground text-lg">
                  {" "}
                  {user?.username}
                </p>
              </span>
            </div>
          </SheetTitle>
          <SheetDescription className="flex gap-5 px-5 mb-5 text-base">
            <span className="text-white font-bold ">
              {" "}
              69 <span className=" text-muted-foreground">Following</span>
            </span>
            <span className="text-white font-bold mb-3">
              3 <span className=" text-muted-foreground">Followers</span>
            </span>
          </SheetDescription>
        </SheetHeader>
        <ul className=" flex flex-col gap-2">
          {LINK_LIST.map((link) => (
            <Link to={link.path}>
            <li
              key={link.id}
              className="relative  flex items-center text-xl font-bold w-full px-5 py-3 hover:bg-secondary "
            >
                <div className="flex justify-start gap-4 items-center">
                  <span>{link.icon}</span>
                  <p className="">{link.label}</p>
                </div>
            </li>
              </Link>
          ))}
          <Popover>
            <PopoverTrigger>
              <li className="relative  flex items-center text-xl font-bold w-full px-5 py-3 hover:bg-secondary ">
                <div className="flex justify-start gap-4 items-center">
                  <span>
                    <MdLogout />
                  </span>
                  <p className="">Log Out</p>
                </div>
              </li>
            </PopoverTrigger>
            <PopoverContent className="w-72 h-40 flex flex-col justify-center gap-2 mx-2">
              <Button
                variant="default"
                className="w-full text-base py-6 rounded-full"
                onClick={handleLogout}
                asChild
              >
                <Link to="/login">Log out {user?.username}</Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full text-base py-6 rounded-full"
              >
                Add an existing account
              </Button>
            </PopoverContent>
          </Popover>
        </ul>
        <SheetFooter className="px-5 mt-6">
          <SheetClose asChild>
            <Button type="submit" disabled className="px-5">
              Just For Fun
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
