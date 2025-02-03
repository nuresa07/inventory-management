import { useAppSelector } from "@/app/redux";
import { SidebarLinkProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarLink = ({ href, icon: Icon, label, isCollapsed }: SidebarLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href || (pathname === "/" && href === "/dashboard")
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  return (
    <Link href={href}>
      <div className={`${isDarkMode ? " text-[#FFFFFF]" : "!text-[#374151]"} cursor-pointer flex items-center ${isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"} hover:text-[#3B82F6] hover:bg-[#8fd2ff] gap-3 transition-colors ${isActive ? "bg-[#3B82F6] text-white" : ''}`}>
        <Icon className="w-6 h-6 " />
        <span className={`${isCollapsed ? 'hidden' : 'block'} font-medium `}>
          {label}
        </span>
      </div>
    </Link>
  )
}