import { PiDotsThreeOutlineFill, PiLockKeyBold } from "react-icons/pi";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { RiTwitterXLine, RiUserLine, RiQuillPenLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoHome, IoSearch, IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineEmail, MdListAlt, MdOutlineGroup } from "react-icons/md";
import { CgMoreO } from "react-icons/cg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { currentUser } from "@/app/features/users/userSlice";
import Modal from "./Modal";
import CreatePost from "@/app/features/posts/CreatePost";
import { useLogoutMutation } from "@/app/api/authApi";
import { toast } from "react-toastify";

type LinkType = {
  id: number;
  path: string;
  icon: JSX.Element;
  label: string;
};
const LINK_LIST: LinkType[] = [
  {
    id: 1,
    label: "Home",
    path: "/",
    icon: <IoHome />,
  },
  { id: 2, label: "Profile", path: "/profile", icon: <RiUserLine /> },
  {
    id: 3,
    label: "Friends",
    path: "/friends",
    icon: <MdOutlineGroup />,
  },
  {
    id: 4,
    label: "Explore",
    path: "/explore",
    icon: <IoSearch />,
  },
  {
    id: 5,
    label: "Notifications",
    path: "/notifications",
    icon: <IoNotificationsOutline />,
  },

  {
    id: 6,
    label: "Message",
    path: "/message",
    icon: <MdOutlineEmail />,
  },
  {
    id: 7,
    label: "List",
    path: "/list",
    icon: <MdListAlt />,
  },

  { id: 8, label: "More", path: "/more", icon: <CgMoreO /> },
];

type VisibilityState = {
  [id: number]: boolean;
};

export default function SideBar() {
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
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
  const handleMouseEnter = (id: number) => {
    setIsVisible((pre) => ({
      ...pre,
      [id]: true,
    }));
  };
  const handleMouseLeave = (id: number) => {
    setIsVisible((pre) => ({
      ...pre,
      [id]: false,
    }));
  };

  return (
    <div className="relative ">
      <div className="sticky top-0 left-0 ">
        <div className="flex flex-col justify-between h-screen items-end p-3 ">
          <ul className="flex flex-col xl:gap-1  mt-2  mr-6 ">
            <Link to="/">
              <li className="w-min text-2xl rounded-full md:ml-2 p-4 hover:bg-secondary">
                <RiTwitterXLine />
              </li>
            </Link>
            {LINK_LIST.map((link) => (
              <Link to={link.path}>
                <li
                  onMouseEnter={() => handleMouseEnter(link.id)}
                  onMouseLeave={() => handleMouseLeave(link.id)}
                  key={link.id}
                  className="relative w-min md:w-full flex items-center text-2xl rounded-full md:px-6 md:py-2 p-3.5 hover:bg-secondary "
                >
                  <div className="flex justify-start gap-4 items-center">
                    <span>{link.icon}</span>
                    <p className="hidden md:flex">{link.label}</p>
                  </div>
                  {isVisible[link.id] && (
                    <p className="md:hidden absolute py-1 px-2 rounded-sm top-14 left-1/2 transform -translate-x-1/2  z-10 bg-slate-700 text-sm">
                      {link.label}
                    </p>
                  )}
                </li>
              </Link>
            ))}
            <Modal>
              <Modal.Open opens="newTweet">
                <li className="md:w-full w-min text-2xl rounded-full  p-3.5 md:px-6 md:py-2 bg-sky-500 hover:bg-sky-600 mt-3 ">
                  <span className="md:hidden">
                    <RiQuillPenLine />
                  </span>
                  <p className="hidden md:flex justify-center">Post</p>
                </li>
              </Modal.Open>
              <Modal.Window name="newTweet">
                <CreatePost isModel={true} onClose={close} />
              </Modal.Window>
            </Modal>
          </ul>
          <div className="flex  mb-2 mr-6 ">
            <Popover>
              <PopoverTrigger>
                <div className="w-max py-1 rounded-full flex  cursor-pointer gap-1  items-center hover:bg-secondary">
                  <img
                    className="w-12 h-12  rounded-full mx-1"
                    src={
                      user?.image
                        ? `http://localhost:3500/assets/${user?.image}`
                        : "./user.png"
                    }
                    alt="photo"
                  />
                  <div className="md:flex items-center justify-between hidden w-full mr-3 ">
                    <span>
                      <p className="flex gap-2 items-center">
                        {user?.name}
                        <span>
                          <PiLockKeyBold />
                        </span>
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {" "}
                        {user?.username}
                      </p>
                    </span>
                    <span className=" text-2xl md:ml-20 pr-2">
                      <PiDotsThreeOutlineFill />
                    </span>
                  </div>
                </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
