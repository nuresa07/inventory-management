"use client"

import React, { useEffect } from 'react'
import Navbar from './(components)/Navbar'
import Sidebar from './(components)/Sidebar'
import StoreProvider, { useAppSelector } from './redux'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed)
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.add("light")
    }
  })

  return (
    <div className={`${isDarkMode ? "dark" : "light"} flex bg-[#F9FAFB]  text-[#1F2937] w-full min-h-screen dark:bg-white`}>
      <Sidebar />
      <main className={`${isDarkMode ? "dark bg-white text-[#FFFFFF]" : "light bg-[#F9FAFB]"} flex flex-col w-full h-full py-7 px-9  ${isSidebarCollapsed ? "md:pl-24" : "md:pl-72"}`}>
        <Navbar />
        {children}
      </main>
    </div>
  )
}

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  )
}

export default DashboardWrapper
