import { useEffect, useState } from "react";
import { IoHome, IoNotificationsOutline, IoSearch } from "react-icons/io5";
import { MdOutlineEmail, MdOutlineGroup } from "react-icons/md";
import { RiQuillPenLine} from "react-icons/ri";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import CreatePost from "@/app/features/posts/CreatePost";

type Props = {};

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
  {
    id: 2,
    label: "Explore",
    path: "/explore",
    icon: <IoSearch />,
  },
  {
    id: 3,
    label: "Friends",
    path: "/friends",
    icon: <MdOutlineGroup />,
  },
  {
    id: 4,
    label: "Notifications",
    path: "/notifications",
    icon: <IoNotificationsOutline />,
  },

  {
    id: 5,
    label: "Message",
    path: "/message",
    icon: <MdOutlineEmail />,
  },
];
export default function NavButtom({}: Props) {
  const [isScrollingDown, setIsScrollingDown] = useState<boolean>(false);
  const [initialScrollY, setInitialScrollY] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isDownwardScroll = currentScrollY > initialScrollY;
      setIsScrollingDown(isDownwardScroll);
      setInitialScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [initialScrollY]);

  return (
    <nav
      className={`fixed w-full bottom-0 border-b-[1px] border-slate-600 ${
        isScrollingDown ? "opacity-20" : ""
      } `}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="relative flex h-14 backdrop-filter backdrop-blur-md items-center justify-between">
        <Modal>
          <Modal.Open opens="newTweet">
            <span className="absolute text-2xl -top-16 right-6 rounded-full  p-3 bg-sky-500">
              <RiQuillPenLine />
            </span>
          </Modal.Open>
          <Modal.Window name="newTweet">
            <CreatePost isModel={true} onClose={close}/>
          </Modal.Window>
        </Modal>
        <ul className="w-full px-5 flex justify-between items-center">
          {LINK_LIST.map((link) => (
            <Link to={link.path}>
            <li
              key={link.id}
              className="relative  flex items-center text-2xl rounded-full  p-2.5 hover:bg-secondary "
            >
                <div className="flex justify-start gap-4 items-center">
                  <span>{link.icon}</span>
                  <p className="hidden lg:flex">{link.label}</p>
                </div>
            </li>
              </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
}
