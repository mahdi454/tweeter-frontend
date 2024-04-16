import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Overview from "../components/Overview";
import SideBar from "../components/SideBar";
import useScreenWidth from "@/hooks/useScreen";
import { Outlet } from "react-router-dom";
import NavButtom from "@/components/NavButtom";
export default function Home() {
  const isNonMobileScreens = useScreenWidth("560px");
  return (
    <MaxWidthWrapper>
      <div className="flex justify-center flex-row bg-background">
        {isNonMobileScreens && <SideBar />}
        <div
          className={`flex-1 relative bg-background min-w-[350px] max-w-[560px] pb-14 ${
            isNonMobileScreens ? "border-x-[1px] border-slate-600 " : "w-[560px]"
          } `}
        >
          <Outlet />
          {!isNonMobileScreens && <NavButtom />}
        </div>
        {isNonMobileScreens &&  <Overview />}
       
      </div>
    </MaxWidthWrapper>
  );
}
