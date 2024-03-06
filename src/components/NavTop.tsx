import { useEffect, useState } from "react";
import { RiSettings2Line, RiTwitterXLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
type Props = {};
type Active = {
  isActive: boolean;
};
export default function NavTop({}: Props) {
  const [show, setShow] = useState<boolean>(true);
  const [lastScroll, setLastScroll] = useState(0);

  const controlNav = () => {
    const scroll = window.scrollY;
    if (scroll > lastScroll + 20) {
      setShow(false);
    } else if (scroll < lastScroll - 20) {
      setShow(true);
    }
    setLastScroll(scroll);
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNav);
    return () => {
      window.removeEventListener("scroll", controlNav);
    };
  }, [lastScroll]);

  return (
    <nav
      className={`fixed bg-black bg-opacity-90 backdrop-filter backdrop-blur-sm w-full right-0 top-0 active ${
        !show && "hidden "
      }  `}
    >
      <div className="flex justify-between px-4 py-2 items-center">
        <img className="w-10 rounded-full" src="./pf.jpg" alt="photo" />
        <span className="text-3xl">
          <RiTwitterXLine />
        </span>
        <span className="text-2xl">
          <RiSettings2Line />
        </span>
      </div>
      <div className="flex justify-evenly">
        <span className="w-1/2 p-4 hover:bg-slate-700 hover:bg-opacity-20 hover:backdrop-filter hover:backdrop-blur-sm">
          <NavLink
            to="/kk"
            onClick={(event) => event.preventDefault()}
            className={({ isActive }: Active) =>
              isActive ? "pb-3  border-b-4 border-blue-400" : ""
            }
          >
            For you
          </NavLink>
        </span>
        <span className="w-1/2  p-4 hover:bg-slate-700 hover:bg-opacity-20 hover:backdrop-filter hover:backdrop-blur-sm">
          <NavLink
            to="/"
            onClick={(event) => event.preventDefault()}
            className={({ isActive }: Active) =>
              isActive ? "pb-3 border-b-4 border-blue-400" : ""
            }
          >
            Following
          </NavLink>
        </span>
      </div>
    </nav>
  );
}
