import { Outlet } from "react-router-dom"

type Props = {}

export default function AppLayout({}: Props) {
  return (
    <div>
        <Outlet/>
    </div>
  )
}