"use client"
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state'
import { Bell, Menu, Moon, Settings, Sun } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {

  const dispatch = useAppDispatch()
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed)
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
  }
  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode))
  }

  return (
    <div className='flex justify-between items-center w-full mb-7'>

      {/* Left Side */}
      <div className="flex justify-between items-center gap-5">
        <button className='px-3 py-3 bg-[#5a8ef5] rounded-full hover:bg-[#ade1ff]'
          onClick={toggleSidebar}
        >
          <Menu className='w-4 h-4' />
        </button>

        <div className="relative">
          <input className='pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-[#D1D5DB] bg-white rounded-lg focus:outline-none focus:border-[#3B82F6]'
            type="search"
            placeholder='start type to search groups & products'
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className='text-[#a8d9fa]' size={20} />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className='flex justify-between items-center gap-5'>
        <div className="hidden md:flex items-center gap-5">
          <div>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun className='cursor-pointer text-[#6b7280]' size={24} />) : (
                <Moon className='cursor-pointer text-[#6b7280]' size={24} />
              )}
            </button>
          </div>
          <div className="relative">
            <Bell className='cursor-pointer text-[#6b7280]' size={24} />
            <span className='absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem]   py-1 text-xs font-semibold leading-none text-[#fee2e2] bg-[#ef4444] rounded-full'>3</span>
          </div>
          <hr className='w-0 h-7 border border-solid border-l border-[#6b7280] mx-3' />
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9">Image</div>
            <span className='font-semibold'>Esa</span>
          </div>
        </div>
        <Link href="/settings">
          <Settings className='cursor-pointer text-[#6b7280]' size={24} />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
