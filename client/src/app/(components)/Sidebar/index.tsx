"use client"

import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'
import { Menu } from 'lucide-react'
import React from 'react'
import { SidebarLink } from './SidebarLink'
import { sidebarLinks } from '@/constants'
import Image from 'next/image'

const Sidebar = () => {

  const dispatch = useAppDispatch()
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed)
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
  }

  const sidebarClassNames = `fixed flex flex-col ${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} transition-all duration-300 overflow-hidden h-full shadow-md z-40 ${isDarkMode ? "bg-white text-[#FFFFFF]" : "bg-[#F9FAFB]"}`

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? "px-5" : "px-8"}`}>
        <Image
          src="https://my-s3-inventorymanagement-system.s3.us-east-2.amazonaws.com/logo.png"
          alt="ESStock"
          width={27} height={27}
          className='rounded w-8'
        />
        <h1 className={`${isSidebarCollapsed ? "hidden" : "block"} font-extrabold text-2xl`}>ESSTOCK</h1>
        <button className='md:hidden px-3 py-3 rounded-full bg-[#5a8ef5] hover:bg-[#ade1ff]'
          onClick={toggleSidebar}
        >
          <Menu className='w-4 h-4' />
        </button>
      </div>

      {/* LINKS */}
      <div className={`flex-grow mt-8`}>
        {sidebarLinks.map((link) => (
          <SidebarLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isCollapsed={isSidebarCollapsed}
          />
        ))}
      </div>

      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className='text-center text-xs text-[#6b7280]'>&copy; 2024 EDSTOCK</p>
      </div>
    </div>
  )
}

export default Sidebar
