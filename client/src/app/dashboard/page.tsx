"use client"

import { CheckCircle, Package, Tag } from "lucide-react"
import CardExpenseSummary from "./CardExpenseSummary"
import CardPopularProducts from "./CardPopularProducts"
import CardPurchaseSummary from "./CardPurchaseSummary"
import CardSalesSummary from "./CardSalesSummary"
import StatCard from "./StatCard"
import { statDate, statDate2, statDate3 } from "@/constants"

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows"> {/* dark:border-2 */}
      <CardPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />
      <CardExpenseSummary />
      <StatCard
        title="Customer & Expenses"
        primaryIcon={<Package className="color-[#1E88E5] w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={statDate}
      />
      <StatCard
        title="Dues & Pending Orders"
        primaryIcon={<CheckCircle className="color-[#1E88E5] w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={statDate2}
      />
      <StatCard
        title="Sales & Discount"
        primaryIcon={<Tag className="color-[#1E88E5] w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={statDate3}
      />
      {/* <div className="md:row-span-1 xl:row-span-2 bg-[#b5aaaa]"></div> */}
    </div>
  )
}

export default Dashboard
