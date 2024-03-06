import Overview from "../components/Overview"
import Posts from "../components/Posts"
import SideBar from "../components/SideBar"

type Props = {}

export default function Home({}: Props) {
  return (
    <div className="bg-black w-full h-screen text-white flex justify-center ">
      <SideBar/>
      <Posts/>
      <Overview/>
    </div>
  )
}