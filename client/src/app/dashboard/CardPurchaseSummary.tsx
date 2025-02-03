import { useGetDashboardMetricsQuery } from '@/state/api'
import { AlertCircle, Loader2, TrendingDown, TrendingUp } from 'lucide-react'
import numeral from 'numeral'
import React from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const CardPurchaseSummary = () => {

  const { data, isLoading, isError } = useGetDashboardMetricsQuery()

  const purchaseData = data?.purchaseSummary || []

  const lastDataPoint = purchaseData[purchaseData.length - 1] || null;

  if (isError) {
    return (
      <div className="flex items-center justify-center py-8 text-red-500">
        <AlertCircle className="w-6 h-6" />
        <span className="ml-2 font-medium">Failed to Fetch Purchase Summary</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 shadow-md rounded-2xl border border-[#D1D5DB]">
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          <span className="ml-2 text-blue-500 font-medium">Loading...</span>
        </div>
      ) : (
        <>
          {/* Header */}
          <div>
            <h2 className='text-lg font-semibold mb-2 px-7 pt-5'>Purchase Summary</h2>
            <hr />
          </div>

          {/* Body */}
          <div className='overflow-auto'>
            <div className='mb-4 mt-7 px-7'>
              <p className='text-xs'>Purchased</p>
              <div className='flex items-center'>
                <p className='text-2xl font-bold'>
                  {lastDataPoint
                    ? numeral(lastDataPoint.totalPurchased).format("$0.00a")
                    : "0"
                  }
                </p>
                {lastDataPoint && (
                  <p className={`text-sm flex ml-3`}>
                    {lastDataPoint.changePercentage! >= 0 ? (
                      <TrendingUp className='w-5 h-5 mr-1 text-[#22c55e]' />
                    ) : (
                      <TrendingDown className='w-5 h-5 mr-1 text-[#ef4444]' />
                    )}
                    {Math.abs(lastDataPoint.changePercentage!)}%
                  </p>
                )}
              </div>
            </div>

            {/* Chart Start */}
            <ResponsiveContainer width="100%" height={170} className="p-2">
              <AreaChart data={purchaseData} margin={{ top: 0, right: 0, left: -50, bottom: 45 }}>
                <XAxis dataKey="date" tick={false} axisLine={false} />
                <YAxis tickLine={false} tick={false} axisLine={false} />
                <Tooltip
                  labelClassName='text-[#00ebff]'
                  formatter={(value: number) => [
                    `$${value.toLocaleString("en")}`
                  ]}
                  labelFormatter={(label) => {
                    const date = new Date(label)
                    return date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })
                  }}
                />
                <Area
                  type="linear"
                  dataKey="totalPurchased"
                  stroke='#8884d8'
                  fill='#8884d8'
                  dot={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  )
}

export default CardPurchaseSummary
