import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { MapPin,Cpu , Trash, Coins, Medal, House, Settings, Home, } from "lucide-react"
const sidebarItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/report", icon: MapPin, label: "Report Waste" },
  { href: "/collect", icon: Trash, label: "Collect Waste" },
  { href: "/rewards", icon: Coins, label: "Rewards" },
  { href: "/leaderboard", icon: Medal, label: "Leaderboard" },
  { href: "/aihelp", icon: Cpu, label: "AI-help" },
  { href: "/club", icon: House, label: "Club" },

]

interface SidebarProps {
  open: boolean
}

export default function Sidebar({ open }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={` bg-white border-r pt-20 border-gray-200 text-gray-800 w-64 fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <nav className="h-full flex flex-col justify-between">
        <div className="px-8 py-12 mb-8 space-y-9 mt-8 border-l-4  border-r-4 border-blue-500">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href} passHref>
              <Button 
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={`w-full justify-start py-3'${
                  pathname === item.href 
                    ? "bg-green-100 text-green-800" 
                    : "text-gray-600 hover:bg-gray-100"
                }`} 
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="text-base">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
        <div className="p-4 border-t  border-grey-500">
          <Link href="/settings" passHref>
            <Button 
              variant={pathname === "/settings" ? "secondary" : "outline"}
              className={`w-full py-3 border-l-4  border-r-4 border-blue-500 ${
                pathname === "/settings"
                  ? "bg-green-100 text-green-800"
                  : "text-gray-600  hover:bg-gray-100"
              }`} 
            >
              <Settings className="mr-3 h-5 w-5" />
              <span className="text-base">Settings</span>
            </Button>
          </Link>
        </div>
      </nav>
    </aside>
  )
}